import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { cookies } from 'next/headers';
import { db } from './db';

//   Create the Context
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


const isAuthed = t.middleware(({ next, ctx }) => {
    // @ts-ignore
    if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
    // @ts-ignore
    return next({ ctx: { userId: ctx.userId } });
});

export const adminProcedure = t.procedure.use(isAuthed).use(async ({ next, ctx }) => {
    const user = await db.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true }
    });

    if (user?.role !== 'ADMIN') {
        // @ts-ignore
        throw new TRPCError({ code: 'FORBIDDEN', message: "Admin access required" });
    }

    return next({ ctx: { user } });
});

export const hostProcedure = t.procedure.use(isAuthed).use(async ({ next, ctx }) => {
    const user = await db.user.findUnique({
        where: { id: ctx.userId },
        select: { role: true }
    });

    if (user?.role !== 'HOST') {
        // @ts-ignore
        throw new TRPCError({ code: 'FORBIDDEN', message: "Host access required" });
    }

    return next({ ctx: { user } });
});

export const router = t.router;
export const publicProcedure = t.procedure;