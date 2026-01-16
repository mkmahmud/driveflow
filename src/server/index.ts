import { router } from './trpc';
import { carRouter } from './routers/car';
import { authRouter } from './routers/auth/auth';

export const appRouter = router({
    car: carRouter,
    auth: authRouter
});

export type AppRouter = typeof appRouter;