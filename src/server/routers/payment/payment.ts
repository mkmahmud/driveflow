import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";
import Stripe from "stripe";
import { TRPCError } from "@trpc/server";

// Initialize Stripe (Ensure your API version is correct)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const paymentRouter = router({
    createStripeSession: protectedProcedure
        .input(z.object({
            bookingData: z.any(),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const { bookingData } = input;

                // 1. Validate Secret Key
                if (!process.env.STRIPE_SECRET_KEY) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Stripe Secret Key is missing from .env",
                    });
                }

                // 2. Create the Session
                const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: `Car Rental: ${bookingData.car.name}`,
                                },
                                unit_amount: Math.round(bookingData.financials.totalAmount * 100),
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    // Updated with baseUrl and explicit error check
                    success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${baseUrl}/payment`,
                    metadata: {
                        userId: ctx.userId,
                        carId: bookingData.car.id,
                        startDate: String(bookingData.reservation.pickupDate),
                        endDate: String(bookingData.reservation.returnDate),
                        includeTank: String(bookingData.addons.fullTank),
                        includeChildSeat: String(bookingData.addons.childSeat),
                    },
                });

                return { url: session.url };
            } catch (error: any) {
                console.error("STRIPE_ERROR:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: error.message || "Failed to create Stripe session",
                });
            }
        }),
});