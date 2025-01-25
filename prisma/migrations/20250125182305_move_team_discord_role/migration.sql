/*
  Warnings:

  - You are about to drop the column `discordRole` on the `TeamCaptain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "discordRole" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TeamCaptain" DROP COLUMN "discordRole";
