import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { GoogleSheets, GoogleSpreadsheets, getGoogleSpreadsheet } from "../../../lib/google-sheets";

export const dynamic = 'force-dynamic';

export default async function Page() {

  const googleSpreadsheet = await getGoogleSpreadsheet(GoogleSpreadsheets.ManualProLeague);
  const sheet = googleSpreadsheet.sheetsById[GoogleSheets.ScoresFixtures];
  const allRows = await sheet.getRows();
  const matchdays = allRows.map((row) => { return row.get("MATCHDAY") }).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return <>
    <h1 className="text-primary">Season One Scores &amp; Fixtures</h1>
    {matchdays && matchdays.map((matchday, index) => {
      const matchdayGames = allRows.filter((row) => { return row.get("MATCHDAY") === matchday });
      return (
        <div key={`${matchday}-${index}`} className="fluid-container mb-3">
          <h2 className="text-secondary text-center">Matchday {matchday}</h2>
          {matchdayGames && matchdayGames.map((game, index) => {
            const winner = determineWinner(game);

            return (
              <div className="row py-2" key={`${matchday}-game-${index}`}>
                <div className={`col text-end text-truncate ${winner === Result.Home ? 'text-primary fw-bold' : ''}`}>{game.get("TEAM HOME")}</div>
                <div className="col-2 text-center text-truncate">{game.get("SCORE HOME")} - {game.get("SCORE AWAY")}</div>
                <div className={`col text-start text-truncate ${winner === Result.Away ? 'text-primary fw-bold' : ''}`}>{game.get("TEAM AWAY")}</div>
              </div>
            )
          })}
        </div>
      )
    })}
  </>;
}


enum Result {
  Home = "home",
  Away = "away",
  Draw = "draw"
}

function determineWinner(game: GoogleSpreadsheetRow<Record<string, any>>) {
  const homeScore = Number(game.get("SCORE HOME"));
  const awayScore = Number(game.get("SCORE AWAY"));

  if (homeScore > awayScore) {
    return Result.Home;
  } else if (homeScore < awayScore) {
    return Result.Away;
  } else {
    return Result.Draw;
  }
}