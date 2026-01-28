-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isKycUploaded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kyc" TEXT[];
