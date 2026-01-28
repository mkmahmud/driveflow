
import { router, adminProcedure, protectedProcedure } from '../../trpc';
import { db } from '../../db';
import z from 'zod';
import bcrypt from 'bcryptjs';
import { TRPCError } from '@trpc/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const userRouter = router({

    getAllUser: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.user.findMany();
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


    // Get Kyc Status
    getKycStatus: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: ctx.userId },
            select: { isKycUploaded: true, isIdentityVerified: true },
        });
        return user;
    }),


    //  Get S3 Permission URL
    getUploadUrl: protectedProcedure
        .input(z.object({ fileType: z.string(), fileName: z.string() }))
        .mutation(async ({ input }) => {
            const key = `kyc/${Date.now()}-${input.fileName}`;
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                ContentType: input.fileType,
            });

            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

            return { signedUrl, publicUrl };
        }),

    //  Save the final URLs to the User model
    saveKycUrls: protectedProcedure
        .input(z.object({ urls: z.array(z.string().url()) }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.user.update({
                where: { id: ctx.userId },
                data: {
                    kyc: { push: input.urls },
                    isKycUploaded: true,
                },
            });
        }),


    // Get all users Kyc Whats uploded but not verified (Admin)
    getAllUsersKyc: adminProcedure.query(async ({ ctx }) => {
        return await ctx.db.user.findMany({
            where: {
                isKycUploaded: true,
                isIdentityVerified: false,

            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isKycUploaded: true,
                isIdentityVerified: true,

                kyc: true,
            }
        });
    }),

    // Get one user (Detail View)
    getUserDetails: adminProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input, ctx }) => {
            return await ctx.db.user.findUnique({
                where: { id: input.userId },

            });
        }),

    // Update KYC Status (Admin)
    updateKycStatus: adminProcedure
        .input(z.object({ userId: z.string(), verified: z.boolean() }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.user.update({
                where: { id: input.userId },
                data: { isIdentityVerified: input.verified },
            });
        }),

    // Reject Documents (Admin)
    rejectKycDocuments: adminProcedure
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            //  Update user
            await ctx.db.user.update({
                where: { id: input.userId },
                data: {
                    isKycUploaded: false,
                    isIdentityVerified: false,
                    kyc: [],
                },
            });

            return { success: true, message: "KYC documents rejected and user notified." };
        }),

});