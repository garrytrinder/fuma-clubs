import { prisma } from "@/app/lib/prisma";
import Image from "next/image";

export default async function Page() {
  const assists =
    (await prisma.$queryRaw`select * from playerstats_top_assists_get(p_tournament_id:=3, p_no_of_top_positions:=100000)`) as {
      rn: number;
      playername: string;
      teamname: string;
      badgeurl: string;
      assists: number;
      matchesplayed: number;
    }[];

  return (
    <>
      <h2 className="text-secondary">Assists</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="text-secondary text-center">#</th>
            <th className="text-secondary">Player</th>
            <th className="text-secondary text-center">Stats</th>
          </tr>
        </thead>
        <tbody>
          {assists.map((player, index) => {
            return (
              <tr key={index}>
                <td className="text-secondary text-center align-middle">{player.rn}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Image
                      src={player.badgeurl ? player.badgeurl : "/badge.svg"}
                      alt={player.teamname}
                      className="rounded-circle mx-2 flex-shrink-0 align-self-center"
                      width={30}
                      height={30}
                    />
                    <div>
                      <div className="fs-5">{player.playername}</div>
                      <div className="d-flex flex-wrap gap-sm-2">
                        <small className="text-muted">
                          Games played: {player.matchesplayed}
                        </small>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center align-middle">{player.assists}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
