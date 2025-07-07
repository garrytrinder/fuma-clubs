import { prisma } from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const topRated =
    (await prisma.$queryRaw`select * from playerstats_top_ratings_get(p_tournament_id:=3, p_min_no_of_matches:=3, p_no_of_to_players:=3)`) as {
      playername: string;
      teamname: string;
      badgeurl: string;
      rating: number;
      man_of_the_match_awards: number;
    }[];

  const goals =
    (await prisma.$queryRaw`select * from playerstats_top_scorers_get(p_tournament_id:=3, p_no_of_to_players:=3)`) as {
      playername: string;
      teamname: string;
      badgeurl: string;
      assists: number;
    }[];

  const assists =
    (await prisma.$queryRaw`select * from playerstats_top_assists_get(p_tournament_id:=3, p_no_of_to_players:=3)`) as {
      playername: string;
      teamname: string;
      badgeurl: string;
      assists: number;
    }[];

  return (
    <>
      <h2 className="text-secondary">Player Stats</h2>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <Card
              title="Top rated"
              players={topRated.map((player) => {
                return {
                  playerName: player.playername,
                  teamName: player.teamname,
                  badgeUrl: player.badgeurl,
                  value: player.rating,
                } as CardPlayer;
              })}
              allLink="/season-three/player-stats/ratings"
              showAll={true}
            />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <Card
              title="Top scorers"
              players={goals.map((player) => {
                return {
                  playerName: player.playername,
                  teamName: player.teamname,
                  badgeUrl: player.badgeurl,
                  value: player.assists,
                } as CardPlayer;
              })}
              allLink="/season-three/player-stats/goals"
              showAll={true}
            />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <Card
              title="Top assists"
              players={assists.map((player) => {
                return {
                  playerName: player.playername,
                  teamName: player.teamname,
                  badgeUrl: player.badgeurl,
                  value: player.assists,
                } as CardPlayer;
              })}
              allLink="/season-three/player-stats/assists"
              showAll={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface CardPlayer {
  playerName: string;
  teamName: string;
  value?: number | string;
  badgeUrl: string;
}

const Card = ({
  title,
  players,
  allLink,
  showAll,
}: {
  title: string;
  players: CardPlayer[];
  allLink: string;
  showAll?: boolean;
}) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {players.map((player, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="card-title">{player.playerName}</h5>
                <span
                  className={`fs-6 badge rounded-pill ${
                    index === 0 ? "text-bg-primary" : ""
                  }`}
                >
                  {player.value?.toString()}
                </span>
              </div>
              <span className="d-flex align-items-center">
                <Image
                  src={player.badgeUrl}
                  alt={player.teamName}
                  width={24}
                  height={24}
                />
                <small className="p-2 text-muted flex-grow-1">
                  {player.teamName}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </div>
      {showAll && (
        <div className="card-footer text-center">
          <Link href={allLink}>All</Link>
        </div>
      )}
    </div>
  );
};
