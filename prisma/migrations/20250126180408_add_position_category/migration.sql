-- CreateEnum
CREATE TYPE "PositionCategory" AS ENUM ('Goalkeeper', 'Defender', 'Midfielder', 'Forward');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "pictureUrl" TEXT;

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "category" "PositionCategory";
