import { PrismaClient } from "@prisma/client";
import { ScoreFixtureRow, TableRow, TournamentRow } from "./types";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function getTournamentInfo(tournament_id: number) {
  const tournamentInfo = await prisma.tournaments.findUnique({
    where: { tournament_id: tournament_id },
    select: { tournament_name: true },
  });
  return tournamentInfo as TournamentRow;
}

export async function getTournamentTable(tournament_id: number) {
  const tableRows = await prisma.$queryRaw<TableRow[]>`
    SELECT * FROM get_tournament_table(${tournament_id}::integer);
  `;
  return tableRows;
}

export async function getTournamentScoresAndFixtures(tournament_id: number) {
  const fixtureRows = await prisma.$queryRaw<ScoreFixtureRow[]>`
    SELECT
      round_number,
      home_team,
      home_team_score,
      away_team_score,
      away_team
    FROM
      get_tournament_scores_fixtures (${tournament_id}::integer);
  `;
  return fixtureRows;
}

export async function fetchTournamentData(id: number) {
  const tournamentInfo = getTournamentInfo(id);
  const tableRows = getTournamentTable(id);
  const fixtureRows = getTournamentScoresAndFixtures(id);

  const data = await Promise.all([tournamentInfo, tableRows, fixtureRows]);

  // group the fixtures by round number
  const fixturesByRound = data[2].reduce(
    (acc: Record<number, ScoreFixtureRow[]>, row: ScoreFixtureRow) => {
      if (!acc[row.round_number]) {
        acc[row.round_number] = [];
      }
      acc[row.round_number].push(row);
      return acc;
    },
    {}
  );

  return {
    tournamentInfo: data[0],
    tableRows: data[1],
    fixturesByRound,
  };
}

export async function getTournamentFixtures(tournament_id: number) {
  const fixtureRows = await prisma.fixtures.findMany({
    where: { tournament_id },
  });
  return fixtureRows;
}

export async function getFixtureById(fixture_id: number) {
  const fixture = await prisma.fixtures.findUnique({
    where: { fixture_id: fixture_id },
  });
  return fixture;
}