
import { router, adminProcedure, protectedProcedure } from '../../trpc';
import { db } from '../../db';
import z from 'zod';
import bcrypt from 'bcryptjs';
import { TRPCError } from '@trpc/server';



export const userRouter = router({

    //   Get All Users (Admin Only) 
    getAllUser: adminProcedure.query(async () => {
        return await db.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true }
        });
    }),

    // Change Password (User)
    changePassword: protectedProcedure
        .input(
            z.object({
                currentPassword: z.string().min(1, "Current password is required"),
                newPassword: z.string().min(8, "New password must be at least 8 characters"),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { currentPassword, newPassword } = input;

            // userId 
            const id = ctx.userId;

            if (!id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You must be logged in."
                });
            }

            //  Fetch user
            const user = await ctx.db.user.findUnique({
                where: { id },
            });

            if (!user || !user.password) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found or account uses OAuth (Google)",
                });
            }

            //  Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "The current password you entered is incorrect",
                });
            }

            //  Hash and Save new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 12);

            await ctx.db.user.update({
                where: { id },
                data: { password: hashedNewPassword },
            });

            return { success: true, message: "Password updated successfully" };
        }),

});