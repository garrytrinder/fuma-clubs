import { prisma } from "@/app/lib/prisma";
import Image from "next/image";

export default async function Page() {
  const topRated =
    (await prisma.$queryRaw`select * from playerstats_top_ratings_get(p_tournament_id:=3, p_min_no_of_matches:=3, p_no_of_to_players:=10000)`) as {
      playername: string;
      teamname: string;
      badgeurl: string;
      rating: number;
      man_of_the_match_awards: number;
    }[];

  return (
    <>
      <h2 className="text-secondary">Ratings</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="text-secondary text-center">#</th>
            <th className="text-secondary">Player</th>
            <th className="text-secondary text-center">Stats</th>
          </tr>
        </thead>
        <tbody>
          {topRated.map((player, index) => {
            return (
              <tr key={index}>
                <td className="text-secondary text-center">{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Image
                      src={player.badgeurl ? player.badgeurl : "/badge.svg"}
                      alt={player.teamname}
                      className="rounded-circle me-2"
                      width={30}
                      height={30}
                    />
                    {player.playername}
                  </div>
                </td>
                <td className="text-center">{player.rating.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
