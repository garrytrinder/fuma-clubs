import { SheetIds, getGoogleSpreadsheet } from "../data/google-sheets";

export default async function ScoresFixturesPage() {

  const googleSpreadsheet = await getGoogleSpreadsheet();
  const sheet = googleSpreadsheet.sheetsById[SheetIds.ScoresFixtures];
  const allRows = await sheet.getRows();
  const matchdays = allRows.map((row) => { return row.get("MATCHDAY") }).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return <>
    <h1 className="text-primary">Scores &amp; Fixtures</h1>
    {matchdays && matchdays.map((matchday, index) => {
      const matchdayGames = allRows.filter((row) => { return row.get("MATCHDAY") === matchday });
      return (
        <div key={`${matchday}-${index}`} className="fluid-container mb-3">
          <h2 className="text-secondary text-center">Matchday {matchday}</h2>
          {matchdayGames && matchdayGames.map((game, index) => {
            return (
              <div className="row py-2" key={`${matchday}-game-${index}`}>
                <div className="col text-end text-truncate">{game.get("TEAM HOME")}</div>
                <div className="col-2 text-center text-truncate">{game.get("SCORE HOME")} - {game.get("SCORE AWAY")}</div>
                <div className="col text-start text-truncate">{game.get("TEAM AWAY")}</div>
              </div>
            )
          })}
        </div>
      )
    })}
  </>;
}