-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "actualPickupTime" TIMESTAMP(3),
ADD COLUMN     "actualReturnTime" TIMESTAMP(3),
ADD COLUMN     "endFuelLevel" INTEGER,
ADD COLUMN     "endMileage" INTEGER,
ADD COLUMN     "handoverOtp" TEXT,
ADD COLUMN     "pickupPhotos" TEXT[],
ADD COLUMN     "returnPhotos" TEXT[],
ADD COLUMN     "startFuelLevel" INTEGER,
ADD COLUMN     "startMileage" INTEGER;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "currentMileage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nextServiceKm" INTEGER;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "depositReleased" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isIdentityVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "bookingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
