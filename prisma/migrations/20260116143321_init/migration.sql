/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `make` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Car` table. All the data in the column will be lost.
  - Added the required column `fuelType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "imageUrl",
DROP COLUMN "make",
DROP COLUMN "model",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fuelType" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "seats" INTEGER NOT NULL,
ADD COLUMN     "transmission" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
