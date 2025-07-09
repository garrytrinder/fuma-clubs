import { prisma } from "@/app/lib/prisma";
import TacticsBoard, { Player } from "./TacticsBoard";

export default async function Page() {
  const goalkeeper = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=1, p_min_matches_pos_or_category := 1, p_group_by_position := true,p_category_or_position := 'GK',p_no_of_top_positions := 1,p_team := null, p_playername := null)`) as Player[];

  const defenders = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=8, p_min_matches_pos_or_category := 8, p_group_by_position := false,p_category_or_position := 'defender',p_no_of_top_positions := 4,p_team := null, p_playername := null)`) as Player[];

  const midfielders = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=8, p_min_matches_pos_or_category := 8, p_group_by_position := false,p_category_or_position := 'midfielder',p_no_of_top_positions := 3,p_team := null, p_playername := null)`) as Player[];

  const forwards = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=8, p_min_matches_pos_or_category := 8, p_group_by_position := false,p_category_or_position := 'forward',p_no_of_top_positions := 3,p_team := null, p_playername := null)`) as Player[];

  return (
    <>
      <h2 className="text-secondary mb-4">Team of the Season</h2>
      <div className="container">
        <TacticsBoard
          goalkeeper={goalkeeper[0]}
          defenders={defenders}
          midfielders={midfielders}
          forwards={forwards}
        />
      </div>
    </>
  );
}
