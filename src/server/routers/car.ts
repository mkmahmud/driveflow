import { z } from 'zod';
import { router, publicProcedure, hostProcedure } from '../trpc';
import { db } from '../db';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const carRouter = router({
    getAll: publicProcedure.query(async () => {
        return await db.car.findMany();
    }),

    // NEW: Get S3 Permission URL
    getUploadUrl: hostProcedure
        .input(z.object({ fileType: z.string(), fileName: z.string() }))
        .mutation(async ({ input }) => {
            const key = `cars/${Date.now()}-${input.fileName}`;
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                ContentType: input.fileType,
            });

            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

            return { signedUrl, publicUrl };
        }),

    addCar: hostProcedure.input(
        z.object({
            name: z.string().min(1),
            brand: z.string().min(1),
            model: z.string().min(1),
            year: z.number(),
            type: z.string(),
            pricePerDay: z.number(),
            securityDeposit: z.number(),
            seats: z.number(),
            transmission: z.string(),
            fuelType: z.string(),
            engineSize: z.string().optional(),
            horsepower: z.number().optional(),
            availableFrom: z.date().nullable(),
            availableTo: z.date().nullable(),
            location: z.string().min(1),
            description: z.string().optional(),
            image: z.string(),
            images: z.array(z.string()),
        })
    ).mutation(async ({ input, ctx }) => {
        const hostId = ctx.userId;
        return await db.car.create({
            data: { ...input, hostId },
        });
    })
});