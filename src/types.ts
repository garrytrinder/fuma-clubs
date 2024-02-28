export type Stats = {
  overall: number;
  weak_foot: number;
  skill_moves: number;
  acceleration: number;
  speed: number;
  finishing: number;
  fk_accuracy: number;
  heading_accuracy: number;
  shot_power: number;
  long_shots: number;
  volleys: number;
  penalties: number;
  vision: number;
  crossing: number;
  long_pass: number;
  short_pass: number;
  curve: number;
  agility: number;
  balance: number;
  attacking_position: number;
  ball_control: number;
  dribbling: number;
  interceptions: number;
  defensive_awareness: number;
  standing_tackle: number;
  sliding_tackle: number;
  jumping: number;
  stamina: number;
  strength: number;
  reactions: number;
  aggression: number;
  gk_diving: number;
  gk_handling: number;
  gk_kicking: number;
  gk_reflexes: number;
  gk_positioning: number;
};

export type DropDownData = {
  heights: string[];
  weights: string[];
  playstyles: string[];
};

export type FormData = {
  position: string;
  height: string;
  weight: string;
  playstyle: string;
};

export type General = {
  overall: number;
  weak_foot: number;
  skill_moves: number;
};

export type Pace = {
  acceleration: number;
  speed: number;
};

export type Shooting = {
  finishing: number;
  fk_accuracy: number;
  heading_accuracy: number;
  shot_power: number;
  long_shots: number;
  volleys: number;
  penalties: number;
};

export type Passing = {
  vision: number;
  crossing: number;
  long_pass: number;
  short_pass: number;
  curve: number;
};

export type Dribbling = {
  agility: number;
  balance: number;
  attacking_position: number;
  ball_control: number;
  dribbling: number;
};

export type Defending = {
  interceptions: number;
  defensive_awareness: number;
  standing_tackle: number;
  sliding_tackle: number;
};

export type Physical = {
  jumping: number;
  stamina: number;
  strength: number;
  reactions: number;
  aggression: number;
};

export type Goalkeeping = {
  gk_diving: number;
  gk_handling: number;
  gk_kicking: number;
  gk_reflexes: number;
  gk_positioning: number;
};

export type Playstyle = {
  position: string;
  value: string;
  overall: number;
  modifiers: KeyValuePair<string, number>[];
};

export type KeyValuePair<T, Q> = {
  key: T;
  value: Q;
};
