import { prisma } from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const topRated = (await prisma.$queryRaw`
  SELECT 
    COALESCE(p.gamertag, p."discordUsername") AS "playerName",
    t.name AS "teamName",
    t."badgeUrl",
    ROUND(AVG(rpp.rating)::NUMERIC, 2) AS rating,
    SUM(CASE WHEN rpp."manOfTheMatch" = true THEN 1 ELSE 0 END) AS man_of_the_match_awards
FROM 
    "ResultPlayerPerformance" rpp
    JOIN "Result" r ON rpp."resultId" = r.id
    JOIN "Fixture" f ON r.id = f."resultId"
    JOIN "Player" p ON rpp."playerId" = p.id
    JOIN "Team" t ON rpp."teamId" = t.id
WHERE 
    f."tournamentId" = 3
    AND rpp.rating IS NOT NULL  -- Only include players with ratings
GROUP BY 
    p.id,
    COALESCE(p.gamertag, p."discordUsername"),
    t.name,
    t."badgeUrl"
HAVING
    COUNT(rpp.id) >= 3  -- Only include players who played at least 3 matches
ORDER BY 
    rating DESC,
    "playerName" ASC
LIMIT 3;
`) as {
    playerName: string;
    teamName: string;
    badgeUrl: string;
    rating: number;
  }[];

  const assists = (await prisma.$queryRaw`
SELECT COALESCE(p.gamertag, p."discordUsername") AS "playerName",
       t.name AS "teamName",
       SUM(rpp.assists) AS assists,
       t."badgeUrl"
FROM "ResultPlayerPerformance" rpp
JOIN "Result" r ON rpp."resultId" = r.id
JOIN "Fixture" f ON r.id = f."resultId"
JOIN "Player" p ON rpp."playerId" = p.id
JOIN "Team" t ON rpp."teamId" = t.id
WHERE f."tournamentId" = 3
    AND rpp.assists > 0
GROUP BY p.id,
         COALESCE(p.gamertag, p."discordUsername"),
         t.name,
         t."badgeUrl"
ORDER BY assists DESC,
         "playerName" ASC
         LIMIT 3;
  `) as {
    playerName: string;
    teamName: string;
    assists: number;
    badgeUrl: string;
  }[];

  const goals = (await prisma.$queryRaw`
  SELECT COALESCE(p.gamertag, p."discordUsername") AS "playerName",
    SUM(rpp.goals) AS goals,
       t.name AS "teamName",
    t."badgeUrl"
FROM 
    "ResultPlayerPerformance" rpp
    JOIN "Result" r ON rpp."resultId" = r.id
    JOIN "Fixture" f ON r.id = f."resultId"
    JOIN "Player" p ON rpp."playerId" = p.id
    JOIN "Team" t ON rpp."teamId" = t.id
WHERE 
    f."tournamentId" = 3 AND
    rpp.goals > 0
GROUP BY 
    p.id,
    COALESCE(p.gamertag, p."discordUsername"),
    t.name,
    t."badgeUrl"
ORDER BY 
    goals DESC,
    "playerName" ASC
LIMIT 3;
`) as {
    playerName: string;
    teamName: string;
    goals: number;
    badgeUrl: string;
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
                  playerName: player.playerName,
                  teamName: player.teamName,
                  badgeUrl: player.badgeUrl,
                  value: player.rating,
                } as CardPlayer;
              })}
              allLink="/season-three/player-stats/ratings"
              showAll={false}
            />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <Card
              title="Top scorers"
              players={goals.map((player) => {
                return {
                  playerName: player.playerName,
                  teamName: player.teamName,
                  badgeUrl: player.badgeUrl,
                  value: player.goals,
                } as CardPlayer;
              })}
              allLink="/season-three/player-stats/goals"
              showAll={false}
            />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <Card
              title="Top assists"
              players={assists.map((player) => {
                return {
                  playerName: player.playerName,
                  teamName: player.teamName,
                  badgeUrl: player.badgeUrl,
                  value: player.assists,
                } as CardPlayer;
              })}
              allLink="/season-three/player-stats/assists"
              showAll={false}
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
