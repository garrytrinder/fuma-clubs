-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "awayTeamFormationId" INTEGER,
ADD COLUMN     "awayTeamRating" DOUBLE PRECISION,
ADD COLUMN     "homeTeamFormationId" INTEGER,
ADD COLUMN     "homeTeamRating" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_homeTeamFormationId_fkey" FOREIGN KEY ("homeTeamFormationId") REFERENCES "Formation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_awayTeamFormationId_fkey" FOREIGN KEY ("awayTeamFormationId") REFERENCES "Formation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
