/*
  Warnings:

  - You are about to drop the column `type` on the `ResultEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResultEvent" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ResultEventType";
