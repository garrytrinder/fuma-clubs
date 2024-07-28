import { GoogleSheets, GoogleSpreadsheets, PreseasonSummer24Sheets, getGoogleSpreadsheet } from "../../data/google-sheets";

export const dynamic = 'force-dynamic';

export default async function PreSeasonTablePage() {

  const googleSpreadsheet = await getGoogleSpreadsheet(GoogleSpreadsheets.PreseasonSummer24);
  const sheet = googleSpreadsheet.sheetsById[PreseasonSummer24Sheets.Table];
  const rows = await sheet.getRows();

  return <>
    <h1 className="text-primary">Table</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className="text-secondary">Teams</th>
          <th className="text-secondary text-center">P</th>
          <th className="text-secondary text-center">W</th>
          <th className="text-secondary text-center">D</th>
          <th className="text-secondary text-center">L</th>
          <th className="text-secondary text-center d-none d-sm-table-cell">GF</th>
          <th className="text-secondary text-center d-none d-sm-table-cell">GA</th>
          <th className="text-secondary text-center">GD</th>
          <th className="text-secondary text-center">Pts</th>
        </tr>
      </thead>
      <tbody>
        {rows && rows.filter(row => row.get("TEAMS") !== undefined).map((row, index: number) => {
          const isFirst = index === 0;

          return isFirst ? (
            <tr key={index + 1}>
              <td className="text-center text-primary">{index + 1}</td>
              <td className="text-primary">{row.get("TEAMS")}</td>
              <td className="text-center text-primary">{row.get("P")}</td>
              <td className="text-center text-primary">{row.get("W")}</td>
              <td className="text-center text-primary">{row.get("D")}</td>
              <td className="text-center text-primary">{row.get("L")}</td>
              <td className="text-center text-primary d-none d-sm-table-cell">{row.get("GF")}</td>
              <td className="text-center text-primary d-none d-sm-table-cell">{row.get("GA")}</td>
              <td className="text-center text-primary">{row.get("GD")}</td>
              <td className="text-center text-primary">{row.get("Pts")}</td>
            </tr>
          ) : (
            <tr key={index + 1}>
              <td className="text-center">{index + 1}</td>
              <td className="text-start">{row.get("TEAMS")}</td>
              <td className="text-center">{row.get("P")}</td>
              <td className="text-center">{row.get("W")}</td>
              <td className="text-center">{row.get("D")}</td>
              <td className="text-center">{row.get("L")}</td>
              <td className="text-center d-none d-sm-table-cell">{row.get("GF")}</td>
              <td className="text-center d-none d-sm-table-cell">{row.get("GA")}</td>
              <td className="text-center">{row.get("GD")}</td>
              <td className="text-center">{row.get("Pts")}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>;
}