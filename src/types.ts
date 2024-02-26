export type Stats = {
  pace: Pace;
  shooting: Shooting;
  passing: Passing;
  dribbling: Dribbling;
  defending: Defending;
  physical: Physical;
  goalkeeping: Goalkeeping;
};

type Pace = {
  acceleration: StatResult;
  speed: StatResult;
};

type Shooting = {
  finishing: StatResult;
  fk_accuracy: StatResult;
  heading_accuracy: StatResult;
  shot_power: StatResult;
  long_shots: StatResult;
  volleys: StatResult;
  penalties: StatResult;
  weak_foot: StatResult;
};

type Passing = {
  vision: StatResult;
  crossing: StatResult;
  long_pass: StatResult;
  short_pass: StatResult;
  curve: StatResult;
};

type Dribbling = {
  agility: StatResult;
  balance: StatResult;
  attacking_position: StatResult;
  ball_control: StatResult;
  dribbling: StatResult;
  skill_moves: StatResult;
};

type Defending = {
  interceptions: StatResult;
  defensive_awareness: StatResult;
  standing_tackle: StatResult;
  sliding_tackle: StatResult;
};

type Physical = {
  jumping: StatResult;
  stamina: StatResult;
  strength: StatResult;
  reactions: StatResult;
  aggression: StatResult;
};

type Goalkeeping = {
  gk_diving: StatResult;
  gk_handling: StatResult;
  gk_kicking: StatResult;
  gk_reflexes: StatResult;
  gk_positioning: StatResult;
};

type StatResult = {
  min: number;
  max: number;
};
