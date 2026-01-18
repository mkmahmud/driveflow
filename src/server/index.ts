import { router } from './trpc';
import { carRouter } from './routers/car';
import { authRouter } from './routers/auth/auth';
import { userRouter } from './routers/user/user';

export const appRouter = router({
    car: carRouter,
    auth: authRouter,
    user: userRouter
});

export type AppRouter = typeof appRouter;