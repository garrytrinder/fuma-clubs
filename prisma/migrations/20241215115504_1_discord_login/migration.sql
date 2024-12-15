/*
  Warnings:

  - A unique constraint covering the columns `[discord_id]` on the table `players` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "access_token" VARCHAR(255),
ADD COLUMN     "refresh_token" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "players_discord_id_key" ON "players"("discord_id");
