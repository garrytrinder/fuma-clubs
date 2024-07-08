import { GoogleSheets, GoogleSpreadsheets, getGoogleSpreadsheet } from "@/app/data/google-sheets";

export const dynamic = 'force-dynamic';

export default async function FreePlayersPage() {
  const googleSpreadsheet = await getGoogleSpreadsheet(GoogleSpreadsheets.ManualProLeague);
  const playersSheet = googleSpreadsheet.sheetsById[GoogleSheets.Players];

  const playersSheetRows = await playersSheet.getRows();
  const players = playersSheetRows.filter((row) => {
    if (row.get("Team")?.toLowerCase() === "Free players".toLowerCase()) {
      return row;
    }
  });
  players.sort((a, b) => {
    if (a.get("PSN ID / Gamertag / Origin username")?.toLowerCase() < b.get("PSN ID / Gamertag / Origin username")?.toLowerCase()) {
      return -1;
    }
    if (a.get("PSN ID / Gamertag / Origin username")?.toLowerCase() > b.get("PSN ID / Gamertag / Origin username")?.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return <>
    <h1 className="text-primary">Free players</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {players && players.map((player, index) =>
          <tr key={index + 1}>
            <td>{player.get("PSN ID / Gamertag / Origin username")}</td>
            <td>{player.get("Country")}</td>
            <td className="text-end"><i className={`bi bi-${getPlatformIcon(player.get("Gaming Platform"))} text-primary`}></i></td>
          </tr>
        )}
      </tbody>
    </table>
  </>;
}

function getPlatformIcon(platform: string) {
  if (platform.toLocaleLowerCase().includes("ps")) {
    return "playstation";
  }
  if (platform.toLocaleLowerCase().includes("xbox")) {
    return "xbox";
  }
  if (platform.toLocaleLowerCase().includes("pc")) {
    return "pc-display-horizontal";
  }
  return "question";
}