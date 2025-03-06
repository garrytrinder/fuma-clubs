/*
  Warnings:

  - You are about to drop the column `posession` on the `ResultMatchStat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResultMatchStat" DROP COLUMN "posession",
ADD COLUMN     "possession" INTEGER,
ALTER COLUMN "ballRecoveryTime" DROP NOT NULL,
ALTER COLUMN "shots" DROP NOT NULL,
ALTER COLUMN "expectedGoals" DROP NOT NULL,
ALTER COLUMN "passes" DROP NOT NULL,
ALTER COLUMN "tackles" DROP NOT NULL,
ALTER COLUMN "tacklesWon" DROP NOT NULL,
ALTER COLUMN "interceptions" DROP NOT NULL,
ALTER COLUMN "saves" DROP NOT NULL,
ALTER COLUMN "foulsCommitted" DROP NOT NULL,
ALTER COLUMN "offsides" DROP NOT NULL,
ALTER COLUMN "corners" DROP NOT NULL,
ALTER COLUMN "freeKicks" DROP NOT NULL,
ALTER COLUMN "dribbleSuccess" DROP NOT NULL,
ALTER COLUMN "shotAccuracy" DROP NOT NULL,
ALTER COLUMN "passAccuracy" DROP NOT NULL;
