import { sql } from "@vercel/postgres";
import { ScoreFixtureRow, TableRow, TournamentRow } from "./types";

export const dynamic = "force-dynamic";

export async function getTournamentInfo(tournament_id: number) {
  const { rows } = await sql<TournamentRow>`
    SELECT tournament_name FROM tournaments WHERE tournament_id = ${tournament_id};
  `;
  const tournamentInfo = rows[0] as TournamentRow;
  return tournamentInfo;
}

export async function getTournamentTable(tournament_id: number) {
  const { rows } = await sql<TableRow>`
    SELECT * FROM get_tournament_table(${tournament_id});
  `;
  return rows;
}

export async function getTournamentScoresAndFixtures(tournament_id: number) {
  const { rows } = await sql<ScoreFixtureRow>`
    SELECT
      round_number,
      home_team,
      home_team_score,
      away_team_score,
      away_team
    FROM
      get_tournament_scores_fixtures (${tournament_id});
  `;
  return rows;
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
  const { rows } = await sql<ScoreFixtureRow>`
    SELECT * FROM fixtures WHERE tournament_id = ${tournament_id};
  `;
  return rows;
}

export async function getFixtureById(fixture_id: number) {
  const { rows } = await sql<ScoreFixtureRow>`
    SELECT * FROM fixtures WHERE id = ${fixture_id};
  `;
  return rows[0];
}

export async function updateFixture(
  fixture_id: number,
  home_team_score: number,
  away_team_score: number
) {
  await sql`
    UPDATE fixtures
    SET home_team_score = ${home_team_score}, away_team_score = ${away_team_score}
    WHERE id = ${fixture_id};
  `;
}
