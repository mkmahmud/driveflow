import { z } from 'zod';
import { router, publicProcedure } from '../../trpc';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export const authRouter = router({

    // Inside authRouter
    me: publicProcedure.query(async ({ ctx }) => {
        // 1. Get user ID from the Context (session/cookie)
        // @ts-ignore
        const userId = ctx.userId;

        if (!userId) return null;

        // 2. Fetch the latest user data from Vercel Postgres
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true } // Exclude password
        });

        return user;
    }),

    logout: publicProcedure.mutation(async () => {
        const cookieStore = await cookies();
        cookieStore.delete('user-id');
        return { success: true };
    }),


    //  SIGNUP: Create a new user
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

            // Hash password (12 rounds of salting is the industry standard)
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user in Vercel Postgres via Prisma
            const user = await db.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return { success: true, userId: user.id };
        }),

    // 2. LOGIN: Verify credentials
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

            // Compare provided password with hashed password in DB
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


});