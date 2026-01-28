// server/routers/booking.ts
import { db } from "@/server/db";
import { protectedProcedure, router } from "@/server/trpc";
import { z } from "zod";
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const getStripe = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not defined");
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export const bookingRouter = router({
    // confirm and create 
    confirmAndCreate: protectedProcedure
        .input(z.object({
            carId: z.string(),
            startDate: z.string().or(z.date()),
            endDate: z.string().or(z.date()),
            totalPrice: z.number(),
            includeTank: z.boolean(),
            includeChildSeat: z.boolean(),
            paymentMethod: z.string(),
            transactionId: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            const stripe = getStripe(); // Initialized only when called
            return await db.$transaction(async (tx) => {
                const booking = await tx.booking.create({
                    data: {
                        userId: ctx.userId,
                        carId: input.carId,
                        startDate: new Date(input.startDate),
                        endDate: new Date(input.endDate),
                        totalPrice: input.totalPrice,
                        includeTank: input.includeTank,
                        includeChildSeat: input.includeChildSeat,
                        status: "CONFIRMED",
                    },
                });

                await tx.payment.create({
                    data: {
                        amount: input.totalPrice,
                        method: input.paymentMethod,
                        status: "COMPLETED",
                        transactionId: input.transactionId || `mock_${Date.now()}`,
                        bookingId: booking.id,
                    },
                });

                return booking;
            });
        }),

    //   Finalize Stripe Booking after redirect
    finalizeStripeBooking: protectedProcedure
        .input(z.object({ sessionId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const stripe = getStripe();
            //   Retrieve the session
            const session = await stripe.checkout.sessions.retrieve(input.sessionId);

            if (session.payment_status !== 'paid') {
                throw new Error("Payment not verified");
            }

            // Prevent duplicate bookings
            const existingPayment = await db.payment.findUnique({
                where: { transactionId: session.id }
            });
            if (existingPayment) return { success: true };

            const meta = session.metadata;
            if (!meta) throw new Error("Missing metadata from Stripe session");

            //   ATOMIC TRANSACTION WITH TYPE CASTING
            return await db.$transaction(async (tx) => {
                const booking = await tx.booking.create({
                    data: {
                        userId: ctx.userId,
                        carId: meta.carId,
                        // Ensure these are parsed correctly
                        startDate: new Date(meta.startDate),
                        endDate: new Date(meta.endDate),
                        // Stripe uses cents, convert back to dollars/integers
                        totalPrice: Math.round((session.amount_total || 0) / 100),
                        // Metadata is always a string "true" or "false"
                        includeTank: meta.includeTank === 'true',
                        includeChildSeat: meta.includeChildSeat === 'true',
                        status: "CONFIRMED",
                    },
                });

                await tx.payment.create({
                    data: {
                        amount: Math.round((session.amount_total || 0) / 100),
                        method: "STRIPE",
                        status: "COMPLETED",
                        transactionId: session.id,
                        bookingId: booking.id,
                    },
                });

                return booking;
            });
        }),

    // Get My Bookings
    getMyBookings: protectedProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).default(10),
                page: z.number().min(1).default(1),
            })
        )
        .query(async ({ ctx, input }) => {
            const { limit, page } = input;
            const skip = (page - 1) * limit;

            // Run both queries in parallel for better performance
            const [bookings, totalCount] = await Promise.all([
                ctx.db.booking.findMany({
                    where: { userId: ctx.userId },
                    orderBy: { createdAt: 'desc' },
                    include: { car: true },
                    take: limit,
                    skip: skip,
                }),
                ctx.db.booking.count({
                    where: { userId: ctx.userId },
                }),
            ]);

            return {
                bookings,
                meta: {
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    currentPage: page,
                    hasMore: skip + bookings.length < totalCount,
                },
            };
        }),

    // Get my Total Bookings Count
    getMyTotalBookingsCount: protectedProcedure
        .query(async ({ ctx }) => {
            return await db.booking.count({
                where: { userId: ctx.userId },
            });
        }),

    // Get single Booking Details
    getBookingDetails: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.booking.findUnique({
                where: { id: input.id },
                include: {
                    car: true,
                    payment: true,
                },
            });
        }),
});