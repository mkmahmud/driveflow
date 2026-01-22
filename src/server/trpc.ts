import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { cookies } from 'next/headers';
import { db } from './db';

// Create the Context
export const createTRPCContext = async () => {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user-id')?.value;

    return {
        db,
        userId,
    };
};

// Initialize tRPC  
const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
});

// Middleware to check if user is logged in
const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: "You must be logged in" });
    }
    return next({
        ctx: {
            userId: ctx.userId
        }
    });
});

/**
 * Procedures
 */
export const router = t.router;
export const publicProcedure = t.procedure;

// Use this for any action requiring a login (Bookings, Payments, Profile updates)
export const protectedProcedure = t.procedure.use(isAuthed);

// Admin Only
export const adminProcedure = protectedProcedure.use(async ({ next, ctx }) => {
    const user = await db.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true }
    });

    if (user?.role !== 'ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: "Admin access required" });
    }
    return next({ ctx: { user } });
});

// Host Only
export const hostProcedure = protectedProcedure.use(async ({ next, ctx }) => {
    const user = await db.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true }
    });

    if (user?.role !== 'HOST') {
        throw new TRPCError({ code: 'FORBIDDEN', message: "Host access required" });
    }
    return next({ ctx: { user } });
});