/*
  Warnings:

  - You are about to drop the column `platform` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discordId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "platform",
ADD COLUMN     "platformId" INTEGER;

-- DropEnum
DROP TYPE "Platform";

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_discordId_key" ON "Player"("discordId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE SET NULL ON UPDATE CASCADE;
