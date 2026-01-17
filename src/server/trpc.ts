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

export const router = t.router;
export const publicProcedure = t.procedure;