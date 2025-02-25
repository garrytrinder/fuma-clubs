/*
  Warnings:

  - You are about to drop the column `distanceCovered` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `distanceSprinted` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `dribbleSuccess` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `dribbles` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `fouls` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `offsides` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `passAccuracy` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `passes` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `possessionLost` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `possessionWon` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `shotAccuracy` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `shots` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `tackleSuccess` on the `ResultPlayerPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `tackles` on the `ResultPlayerPerformance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "awayTeamHalfTimeScore" INTEGER,
ADD COLUMN     "homeTeamHalfTimeScore" INTEGER,
ADD COLUMN     "recordingAwayGame1" TEXT,
ADD COLUMN     "recordingAwayGame2" TEXT,
ADD COLUMN     "recordingHomeGame1" TEXT,
ADD COLUMN     "recordingHomeGame2" TEXT;

-- AlterTable
ALTER TABLE "ResultPlayerPerformance" DROP COLUMN "distanceCovered",
DROP COLUMN "distanceSprinted",
DROP COLUMN "dribbleSuccess",
DROP COLUMN "dribbles",
DROP COLUMN "fouls",
DROP COLUMN "offsides",
DROP COLUMN "passAccuracy",
DROP COLUMN "passes",
DROP COLUMN "possessionLost",
DROP COLUMN "possessionWon",
DROP COLUMN "shotAccuracy",
DROP COLUMN "shots",
DROP COLUMN "tackleSuccess",
DROP COLUMN "tackles",
ADD COLUMN     "cleanSheet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownGoals" INTEGER,
ADD COLUMN     "positionId" INTEGER;

-- AddForeignKey
ALTER TABLE "ResultPlayerPerformance" ADD CONSTRAINT "ResultPlayerPerformance_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
