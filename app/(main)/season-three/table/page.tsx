import { prisma } from "@/app/lib/prisma";
import Image from "next/image";

export default async function Page() {
  const tableData = await prisma.$queryRaw<TableRow[]>`
    SELECT * FROM public.teamstandings_get(p_tournament_id := 3);
    `;

  const tournament = await prisma.tournament.findUnique({
    where: { id: 3 },
  });

  return (
    <>
      <h1 className="text-primary">{tournament?.name}</h1>
      <h2 className="text-secondary">Table</h2>

      <TournamentTable tableData={tableData} />
    </>
  );
}

export interface TableRow {
  id: number;
  badgeurl: string;
  team: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  total_points: number;
  goals_scored: number;
  goals_conceded: number;
  goal_difference: number;
  form: string;
}

const TournamentTable = ({ tableData }: { tableData: TableRow[] }) => {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th className="text-secondary text-center">#</th>
          <th className="text-secondary">Team</th>
          <th className="text-secondary text-center">PL</th>
          <th className="text-secondary text-center">W</th>
          <th className="text-secondary text-center">D</th>
          <th className="text-secondary text-center">L</th>
          <th className="text-secondary text-center">+/-</th>
          <th className="text-secondary text-center">GD</th>
          <th className="text-secondary text-center">PTS</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => {
          return (
            <tr key={row.id} className={`${index === 0 ? "text-primary" : ""}`}>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {index + 1}
              </td>
              <td className={index === 0 ? "text-primary" : ""}>
                <div className="d-flex flex-row gap-2">
                  <div>
                    <Image
                      src={row.badgeurl ? row.badgeurl : "/badge.svg"}
                      alt={row.team}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>{row.team}</div>
                </div>
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.matches_played}
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.wins}
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.draws}
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.losses}
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.goals_scored}-{row.goals_conceded}
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.goal_difference}
              </td>
              <td
                className={`text-center ${index === 0 ? "text-primary" : ""}`}
              >
                {row.total_points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
