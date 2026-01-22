import { router } from './trpc';
import { carRouter } from './routers/car';
import { authRouter } from './routers/auth/auth';
import { userRouter } from './routers/user/user';
import { paymentRouter } from './routers/payment/payment';
import { bookingRouter } from './routers/booking/booking';

export const appRouter = router({
    car: carRouter,
    auth: authRouter,
    user: userRouter,
    payment: paymentRouter,
    booking: bookingRouter,
});

export type AppRouter = typeof appRouter;