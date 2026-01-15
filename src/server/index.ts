import { router } from './trpc';
import { carRouter } from './routers/car';

export const appRouter = router({
    car: carRouter,
});

export type AppRouter = typeof appRouter;