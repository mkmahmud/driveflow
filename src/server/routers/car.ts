import { z } from 'zod';
import { router, hostProcedure, publicProcedure } from '../trpc';
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

    // Get All Cars
    getAllCars: publicProcedure
        .input(
            z.object({
                location: z.string().default(""),
                startDate: z.string(),
                endDate: z.string(),
                minPrice: z.number().optional(),
                maxPrice: z.number().optional(),
                types: z.array(z.string()).optional(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { location, startDate, minPrice, maxPrice, types } = input;

            //   Prepare Request Dates: Start of pick-up day vs End of return day
            const startReq = new Date(startDate);
            startReq.setUTCHours(0, 0, 0, 0);

            const endReq = new Date(startDate);
            endReq.setUTCHours(23, 59, 59, 999);

            const searchTerms = location.trim().split(/\s+/).filter((t) => t.length > 0);

            return await ctx.db.car.findMany({
                where: {
                    AND: [
                        // Location 
                        {
                            OR: [
                                { location: { contains: location, mode: "insensitive" as const } },
                                ...searchTerms.map((term) => ({
                                    location: { contains: term, mode: "insensitive" as const },
                                })),
                            ],
                        },

                        // DATE  

                        { availableFrom: { lte: endReq } },
                        { availableTo: { gte: startReq } },

                        // Price & Type  
                        { pricePerDay: { gte: minPrice ?? 0, lte: maxPrice ?? 10000 } },
                        ...(types && types.length > 0 ? [{ type: { in: types } }] : []),

                        // Booking Logic
                        {
                            bookings: {
                                none: {
                                    AND: [
                                        { status: { in: ["CONFIRMED", "PENDING"] as const } },
                                        {
                                            OR: [
                                                {
                                                    startDate: { lte: endReq },
                                                    endDate: { gte: startReq },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
                orderBy: { createdAt: "desc" },
            });
        }),





    //get Single Car Details
    getCarDetails: publicProcedure
        .input(z.object({ carId: z.string() }))
        .query(async ({ input }) => {
            return await db.car.findUnique({
                where: { id: input.carId },
            });
        }),


    //  Get S3 Permission URL
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


    // Add a new car
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

        // --- DATE   ---
        let cleanAvailableFrom = input.availableFrom;
        let cleanAvailableTo = input.availableTo;

        if (cleanAvailableFrom) {
            cleanAvailableFrom = new Date(cleanAvailableFrom);
            cleanAvailableFrom.setUTCHours(0, 0, 0, 0);
        }

        if (cleanAvailableTo) {
            cleanAvailableTo = new Date(cleanAvailableTo);
            cleanAvailableTo.setUTCHours(23, 59, 59, 999);
        }


        return await db.car.create({
            data: {
                ...input,
                hostId,
                availableFrom: cleanAvailableFrom,
                availableTo: cleanAvailableTo
            },
        });
    }),

    // Get My Cars
    getMyCars: hostProcedure.query(async ({ ctx }) => {
        const hostId = ctx.userId;
        return await db.car.findMany({
            where: { hostId },
        });
    }),

    // Get Car by ID
    getCarById: hostProcedure
        .input(z.object({ carId: z.string().uuid() }))
        .query(async ({ input, ctx }) => {
            const hostId = ctx.userId;
            return await db.car.findFirst({
                where: { id: input.carId, hostId },
            });
        }),


    // Update Car
    updateCar: hostProcedure
        .input(
            z.object({
                carId: z.string().uuid(),
                name: z.string().min(1).optional(),
                brand: z.string().min(1).optional(),
                model: z.string().min(1).optional(),
                year: z.number().optional(),
                type: z.string().optional(),
                pricePerDay: z.number().optional(),
                securityDeposit: z.number().optional(),
                seats: z.number().optional(),
                transmission: z.string().optional(),
                fuelType: z.string().optional(),
                engineSize: z.string().optional(),
                horsepower: z.number().optional(),
                availableFrom: z.date().nullable().optional(),
                availableTo: z.date().nullable().optional(),
                location: z.string().min(1).optional(),
                description: z.string().optional(),
                image: z.string().optional(),
                images: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const hostId = ctx.userId;
            const { carId, ...updateData } = input;
            return await db.car.updateMany({
                where: { id: carId, hostId },
                data: { ...updateData },
            });
        }),

    // Delete Car
    deleteCar: hostProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await db.car.deleteMany({
                where: { id: input.id, hostId: ctx.userId }
            });
        }),
});