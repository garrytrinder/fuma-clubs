import { prisma } from "@/app/lib/prisma";

export default async function Page() {
  const goalkeeper = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=1, p_min_matches_pos_or_category := 1, p_group_by_position := true,p_category_or_position := 'GK',p_no_of_top_positions := 1,p_team := null, p_playername := null)`) as Player[];

  const defenders = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=8, p_min_matches_pos_or_category := 6, p_group_by_position := false,p_category_or_position := 'defender',p_no_of_top_positions := 4,p_team := null, p_playername := null)`) as Player[];

  const midfielders = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=8, p_min_matches_pos_or_category := 6, p_group_by_position := false,p_category_or_position := 'midfielder',p_no_of_top_positions := 3,p_team := null, p_playername := null)`) as Player[];

  const forwards = (await prisma.$queryRaw`
    select * from public.player_ratings_get(p_tournament_id := 3,p_min_no_of_matches_total :=8, p_min_matches_pos_or_category := 6, p_group_by_position := false,p_category_or_position := 'forward',p_no_of_top_positions := 3,p_team := null, p_playername := null)`) as Player[];

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

interface Player {
  rn: number;
  playername: number;
  position_name: string;
  short_name: string;
  category: string;
  avg_rating: number;
  mathchesplayed_pos_or_category: number;
  totalmatchesplayed: number;
  teamname: string;
  badgeurl: string;
}

interface TacticsBoardProps {
  goalkeeper: Player;
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
}

function TacticsBoard({
  goalkeeper,
  defenders,
  midfielders,
  forwards,
}: TacticsBoardProps) {
  const PlayerCard = ({ player }: { player: Player }) => (
    <div className={"d-flex flex-column align-items-center"}>
      <div
        className="rounded-circle bg-warning d-flex align-items-center justify-content-center text-dark fw-bold position-relative"
        style={{ width: "40px", height: "40px", fontSize: "14px" }}
      >
        {player?.avg_rating.toFixed(2)}
      </div>
      <div className="text-center mt-2" style={{ fontSize: "12px" }}>
        <div className="fw-semibold text-truncate">{player?.playername}</div>
        <div className="text-muted small">{player?.teamname}</div>
      </div>
    </div>
  );

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="card-body">
        <div className="row py-3">
          {forwards.map((forward, index) => (
            <div className="col-4" key={`forward-${index}`}>
              <PlayerCard player={forward} />
            </div>
          ))}
        </div>
        <div className="row py-3">
          {midfielders.map((midfielder, index) => (
            <div className="col-4" key={`midfielder-${index}`}>
              <PlayerCard player={midfielder} />
            </div>
          ))}
        </div>
        <div className="row py-3">
          {defenders.map((defender, index) => (
            <div className="col-3" key={`defender-${index}`}>
              <PlayerCard player={defender} />
            </div>
          ))}
        </div>
        <div className="row py-3">
          <div className="col">
            <PlayerCard player={goalkeeper} />
          </div>
        </div>
      </div>
    </div>
  );
}
