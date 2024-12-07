export type TableRow = {
  position: number;
  team_name: string;
  games_played: number;
  won: number;
  draw: number;
  loss: number;
  goals_scored: number;
  goals_conceded: number;
  goal_difference: number;
  points: number;
};

export type TournamentRow = {
  tournament_name: string;
};

export type ScoreFixtureRow = {
  fixture_id: number;
  round_number: number;
  home_team: string;
  home_team_score: number;
  away_team_score: number;
  away_team: string;
};

export type FixtureRow = {
  fixture_id: number;
  home_team_id: number;
  away_team_id: number;
  tournament_id: number;
  tournament_round_id: number;
};