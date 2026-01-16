import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../db'; // Your prisma client

export const carRouter = router({
    getAll: publicProcedure.query(async () => {
        return await db.car.findMany();
    }),

});