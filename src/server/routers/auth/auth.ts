import { z } from 'zod';
import { router, publicProcedure } from '../../trpc';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authRouter = router({

    // Me: Get current authenticated user
    me: publicProcedure.query(async ({ ctx }) => {
        // @ts-ignore
        const userId = ctx.userId;

        if (!userId) return null;

        // Fetch user  
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true }
        });

        return user;
    }),

    logout: publicProcedure.mutation(async () => {
        const cookieStore = await cookies();
        cookieStore.delete('user-id');
        return { success: true };
    }),


    //  SIGNUP 
    signup: publicProcedure
        .input(z.object({
            name: z.string().min(2, "Name is too short"),
            email: z.string().email("Invalid email address"),
            password: z.string().min(8, "Password must be at least 8 characters"),
        }))
        .mutation(async ({ input }) => {
            const { email, password, name } = input;

            // Check if user already exists
            const userExists = await db.user.findUnique({ where: { email } });
            if (userExists) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'An account with this email already exists.',
                });
            }

            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user  
            const user = await db.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return { success: true, userId: user.id };
        }),

    //   LOGIN 
    login: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string(),
        }))
        .mutation(async ({ input }) => {
            const { email, password } = input;

            // Find user
            const user = await db.user.findUnique({ where: { email } });


            if (!user || !user.password) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid email or password',
                });
            }

            // Compare password  
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid email or password',
                });
            }

            (await cookies()).set('user-id', user.id, {
                httpOnly: true,
                secure: process.env.NODE_SCHEMA === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 1 week 
            });

            return {
                success: true,
                user: { id: user.id, email: user.email, name: user.name }
            };
        }),

    // Google Auth
    googleAuth: publicProcedure
        .input(z.object({ token: z.string() }))
        .mutation(async ({ input }) => {
            //   Verify the Google Token
            const ticket = await client.verifyIdToken({
                idToken: input.token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Google token' });
            }

            //  Sync with Database  
            const user = await db.user.upsert({
                where: { email: payload.email },
                update: {
                    name: payload.name,

                },
                create: {
                    email: payload.email,
                    name: payload.name || "Google User",
                    password: "",
                },
            });

            // Set cookie
            (await cookies()).set('user-id', user.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
            });

            return { success: true, user };
        }),
});