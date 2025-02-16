-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_roundId_fkey";

-- AlterTable
ALTER TABLE "Fixture" ALTER COLUMN "roundId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE SET NULL ON UPDATE CASCADE;
