import { protectedProcedure, router } from "@/server/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";



export const wishlistsRouter = router({
    // add to wishlist
    addToWishlist: protectedProcedure
        .input(z.object({
            carId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { carId } = input;
            const wishlist = await ctx.db.wishlist.create({
                data: {
                    carId,
                    userId: ctx.userId,
                },
            });
            return wishlist;
        }),

    // Check If Already In Wishlist

    checkIfWishlisted: protectedProcedure
        .input(z.object({
            carId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const { carId } = input;
            const wishlist = await ctx.db.wishlist.findFirst({
                where: {
                    carId,
                    userId: ctx.userId,
                },
            });
            return wishlist;
        }),

    // Remove from Wishlist
    removeFromWishlist: protectedProcedure
        .input(z.object({
            carId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { carId } = input;

            const wishlist = await ctx.db.wishlist.findFirst({
                where: {
                    carId,
                    userId: ctx.userId,
                },
            });

            if (!wishlist) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Wishlist item not found",
                });
            }

            return await ctx.db.wishlist.delete({
                where: {
                    id: wishlist.id,
                },
            });
        }),

    // Get All Wishlist
    getAllWishlist: protectedProcedure
        .query(async ({ ctx }) => {
            const wishlist = await ctx.db.wishlist.findMany({
                where: {
                    userId: ctx.userId,
                },
                include: {
                    car: true,
                },
            });
            return wishlist;
        }),

})