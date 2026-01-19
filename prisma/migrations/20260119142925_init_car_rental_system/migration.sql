/*
  Warnings:

  - Added the required column `totalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "availableFrom" TIMESTAMP(3),
ADD COLUMN     "availableTo" TIMESTAMP(3),
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "engineSize" TEXT,
ADD COLUMN     "horsepower" INTEGER,
ADD COLUMN     "hostId" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "securityDeposit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "carId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
