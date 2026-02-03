-- CreateTable
CREATE TABLE "BookingPhase" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingPhase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingPhase" ADD CONSTRAINT "BookingPhase_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
