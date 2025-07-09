export interface Player {
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

export default function TacticsBoard({
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
