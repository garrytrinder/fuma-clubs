/*
  Warnings:

  - You are about to drop the column `iso` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `unicode` on the `Country` table. All the data in the column will be lost.
  - Added the required column `emoji` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "iso",
DROP COLUMN "unicode",
ADD COLUMN     "emoji" TEXT NOT NULL;
