import Link from "next/link";
import { SheetIds, getGoogleSpreadsheet } from "../data/google-sheets";
import { convertTeamNameToUrl } from "../components/helpers";

export const dynamic = 'force-dynamic';

export default async function TeamsPage() {

  const googleSpreadsheet = await getGoogleSpreadsheet();
  const teamsSheet = googleSpreadsheet.sheetsById[SheetIds.Teams];
  const hallOfFameSheet = googleSpreadsheet.sheetsById[SheetIds.HallOfFame];

  const data = await Promise.all([await teamsSheet.getRows(), await hallOfFameSheet.getRows()]);

  const filteredTeamsRows = data[0].filter((row) => row.get("Active") === "YES");

  return <>
    <h1 className="text-primary">Teams</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {filteredTeamsRows && filteredTeamsRows.map((row, index) => {
          const trophyRows = data[1].filter((hofRow) => hofRow.get("Team") === row.get("Teams"));

          return (
            <tr key={index + 1}>
              <td><Link href={`/teams/${convertTeamNameToUrl(row.get("Teams"))}`}>{row.get("Teams")}</Link></td>
              <td className="text-end">
                {trophyRows.length > 0 ?
                  trophyRows.map((row) =>
                    <i key={`${row.get("Teams")}-${index}`} className="bi bi-trophy-fill text-warning p-1" title={row.get("Date")}></i>)
                  : null}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>
}