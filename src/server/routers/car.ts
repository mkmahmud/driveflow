import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../db'; // Your prisma client

export const carRouter = router({
    getAll: publicProcedure.query(async () => {
        return 10;
    }),
    create: publicProcedure
        .input(z.object({ make: z.string(), model: z.string(), price: z.number() }))
        .mutation(async ({ input }) => {
            return await db.car.create({ data: { ...input, pricePerDay: input.price } });
        }),
});