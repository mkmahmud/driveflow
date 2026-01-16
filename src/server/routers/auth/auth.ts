import { z } from 'zod';
import { router, publicProcedure } from '../../trpc';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';

export const authRouter = router({
    // 1. SIGNUP: Create a new user
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

            // In a production app, you'd now initialize a Session (e.g., via NextAuth)
            return {
                success: true,
                user: { id: user.id, email: user.email, name: user.name }
            };
        }),
});