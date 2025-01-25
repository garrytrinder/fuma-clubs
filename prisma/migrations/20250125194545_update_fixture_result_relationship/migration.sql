/*
  Warnings:

  - A unique constraint covering the columns `[resultId]` on the table `Fixture` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_resultid_fkey";

-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "resultId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_resultId_key" ON "Fixture"("resultId");

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;
