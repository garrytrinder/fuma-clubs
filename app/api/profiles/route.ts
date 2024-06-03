import { NextResponse } from "next/server";
import { Profile } from "./type";
import {
  getGoogleSpreadsheet,
  GkSystemSheets,
  GoogleSpreadsheets,
} from "@/app/data/google-sheets";

export async function GET(request: Request) {
  const googleSpreadsheet = await getGoogleSpreadsheet(
    GoogleSpreadsheets.GkSystem
  );
  const sheet = googleSpreadsheet.sheetsById[GkSystemSheets.Profiles];
  const rows = await sheet.getRows<Profile>();
  const data = rows.map((row) => {
    return {
      name: row.get("name"),
      position: row.get("position"),
      height: row.get("height"),
      weight: row.get("weight"),
      acceleration: row.get("acceleration"),
      acceleration_total: row.get("acceleration_total"),
      speed: row.get("speed"),
      speed_total: row.get("speed_total"),
      finishing: row.get("finishing"),
      finishing_total: row.get("finishing_total"),
      fk_accuracy: row.get("fk_accuracy"),
      fk_accuracy_total: row.get("fk_accuracy_total"),
      heading_accuracy: row.get("heading_accuracy"),
      heading_accuracy_total: row.get("heading_accuracy_total"),
      shot_power: row.get("shot_power"),
      shot_power_total: row.get("shot_power_total"),
      long_shots: row.get("long_shots"),
      long_shots_total: row.get("long_shots_total"),
      volleys: row.get("volleys"),
      volleys_total: row.get("volleys_total"),
      penalties: row.get("penalties"),
      penalties_total: row.get("penalties_total"),
      weak_foot: row.get("weak_foot"),
      weak_foot_total: row.get("weak_foot_total"),
      vision: row.get("vision"),
      vision_total: row.get("vision_total"),
      crossing: row.get("crossing"),
      crossing_total: row.get("crossing_total"),
      long_pass: row.get("long_pass"),
      long_pass_total: row.get("long_pass_total"),
      short_pass: row.get("short_pass"),
      short_pass_total: row.get("short_pass_total"),
      curve: row.get("curve"),
      curve_total: row.get("curve_total"),
      agility: row.get("agility"),
      agility_total: row.get("agility_total"),
      balance: row.get("balance"),
      balance_total: row.get("balance_total"),
      attacking_position: row.get("attacking_position"),
      attacking_position_total: row.get("attacking_position_total"),
      ball_control: row.get("ball_control"),
      ball_control_total: row.get("ball_control_total"),
      dribbling: row.get("dribbling"),
      dribbling_total: row.get("dribbling_total"),
      skill_moves: row.get("skill_moves"),
      skill_moves_total: row.get("skill_moves_total"),
      interceptions: row.get("interceptions"),
      interceptions_total: row.get("interceptions_total"),
      defensive_awareness: row.get("defensive_awareness"),
      defensive_awareness_total: row.get("defensive_awareness_total"),
      stand_tackle: row.get("stand_tackle"),
      stand_tackle_total: row.get("stand_tackle_total"),
      slide_tackle: row.get("slide_tackle"),
      slide_tackle_total: row.get("slide_tackle_total"),
      jumping: row.get("jumping"),
      jumping_total: row.get("jumping_total"),
      stamina: row.get("stamina"),
      stamina_total: row.get("stamina_total"),
      strength: row.get("strength"),
      strength_total: row.get("strength_total"),
      reactions: row.get("reactions"),
      reactions_total: row.get("reactions_total"),
      aggression: row.get("aggression"),
      aggression_total: row.get("aggression_total"),
      gk_diving: row.get("gk_diving"),
      gk_diving_total: row.get("gk_diving_total"),
      gk_handling: row.get("gk_handling"),
      gk_handling_total: row.get("gk_handling_total"),
      gk_kicking: row.get("gk_kicking"),
      gk_kicking_total: row.get("gk_kicking_total"),
      gk_reflexes: row.get("gk_reflexes"),
      gk_reflexes_total: row.get("gk_reflexes_total"),
      gk_positioning: row.get("gk_positioning"),
      gk_positioning_total: row.get("gk_positioning_total"),
      pts_max: row.get("pts_max"),
      ps_max: row.get("ps_max"),
      ps_ballcontrol_max: row.get("ps_ballcontrol_max"),
      ps_ballcontrol_gold: splitPlayStyles(row.get("ps_ballcontrol_gold")),
      ps_ballcontrol_silver: splitPlayStyles(row.get("ps_ballcontrol_silver")),
      ps_defending_max: row.get("ps_defending_max"),
      ps_defending_gold: splitPlayStyles(row.get("ps_defending_gold")),
      ps_defending_silver: splitPlayStyles(row.get("ps_defending_silver")),
      ps_passing_max: row.get("ps_passing_max"),
      ps_passing_gold: splitPlayStyles(row.get("ps_passing_gold")),
      ps_passing_silver: splitPlayStyles(row.get("ps_passing_silver")),
      ps_physical_max: row.get("ps_physical_max"),
      ps_physical_gold: splitPlayStyles(row.get("ps_physical_gold")),
      ps_physical_silver: splitPlayStyles(row.get("ps_physical_silver")),
      ps_shooting_max: row.get("ps_shooting_max"),
      ps_shooting_gold: splitPlayStyles(row.get("ps_shooting_gold")),
      ps_shooting_silver: splitPlayStyles(row.get("ps_shooting_silver")),
      ps_goalkeeper_max: row.get("ps_goalkeeper_max"),
      ps_goalkeeper_gold: splitPlayStyles(row.get("ps_goalkeeper_gold")),
      ps_goalkeeper_silver: splitPlayStyles(row.get("ps_goalkeeper_silver")),
    };
  });

  return NextResponse.json(data, { status: 200 });
}

const splitPlayStyles = (playStyle: string) => {
  if (!playStyle) {
    return [];
  }
  const playStyles = playStyle.split(";");
  return playStyles[0] === "" ? [] : playStyles;
};
