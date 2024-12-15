/*
  Warnings:

  - A unique constraint covering the columns `[discordUsername]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gamertag]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eaId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_discordUsername_key" ON "Player"("discordUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Player_gamertag_key" ON "Player"("gamertag");

-- CreateIndex
CREATE UNIQUE INDEX "Player_eaId_key" ON "Player"("eaId");
