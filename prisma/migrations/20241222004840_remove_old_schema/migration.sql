/*
  Warnings:

  - You are about to drop the `fixtures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `match_event_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `platforms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tournament_rounds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tournaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fixtures" DROP CONSTRAINT "fixtures_away_team_id_fkey";

-- DropForeignKey
ALTER TABLE "fixtures" DROP CONSTRAINT "fixtures_home_team_id_fkey";

-- DropForeignKey
ALTER TABLE "fixtures" DROP CONSTRAINT "fixtures_tournament_id_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_team_id_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_fixture_id_fkey";

-- DropForeignKey
ALTER TABLE "tournament_rounds" DROP CONSTRAINT "tournament_rounds_tournament_id_fkey";

-- DropTable
DROP TABLE "fixtures";

-- DropTable
DROP TABLE "match_event_types";

-- DropTable
DROP TABLE "platforms";

-- DropTable
DROP TABLE "players";

-- DropTable
DROP TABLE "results";

-- DropTable
DROP TABLE "teams";

-- DropTable
DROP TABLE "tournament_rounds";

-- DropTable
DROP TABLE "tournaments";
