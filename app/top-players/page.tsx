import { getGoogleSpreadsheet, GoogleSpreadsheets, GoogleSheets } from "../data/google-sheets";

export const dynamic = 'force-dynamic';

export default async function TopPlayersPage() {
  const googleSpreadsheet = await getGoogleSpreadsheet(GoogleSpreadsheets.PostResults);
  const goalsSheet = googleSpreadsheet.sheetsById[GoogleSheets.GoalsRanking];
  const assistsSheet = googleSpreadsheet.sheetsById[GoogleSheets.AssistsRanking];

  const data = await Promise.all([await goalsSheet.getRows(), await assistsSheet.getRows()]);

  const goalsRows = data[0].filter(row => row.get("PLAYERS") !== "" && row.get("GOALS") > 0);
  const assistsRows = data[1].filter(row => row.get("PLAYERS") !== "" && row.get("ASSISTS") > 0);

  return <>
    <h1 className="text-primary">Top Players</h1>
    <p></p>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#" id="topscorers-tab" data-bs-toggle="tab" data-bs-target="#top-scorers" type="button" role="tab" aria-controls="top-scorers" aria-selected="true">Top Scorers</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" id="topassists-tab" data-bs-toggle="tab" data-bs-target="#top-assists" type="button" role="tab" aria-controls="top-assists" aria-selected="true">Top Assists</a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane active" id="top-scorers" role="tabpanel" aria-labelledby="topscorers-tab" tabIndex={0}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Goals</span>
                <span className="d-block d-md-none">GL</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Played</span>
                <span className="d-block d-md-none">P</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Goals per match</span>
                <span className="d-block d-md-none">GPM</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {goalsRows && goalsRows.map((row, index) => {
              const player = row.get("PLAYERS");
              const club = row.get("TEAMS");
              const games = row.get("GAMES PLAYED");
              const goals = row.get("GOALS");
              const goalsMatch = row.get("GOAL/MATCH");

              return <tr key={index + 1}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="vstack">
                    <span className="text-primary fw-bold">{player}</span>
                    <span>{club}</span>
                  </div>
                </td>
                <td className="text-center align-middle">{goals}</td>
                <td className="text-center align-middle">{games}</td>
                <td className="text-center align-middle">{goalsMatch}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className="tab-pane" id="top-assists" role="tabpanel" aria-labelledby="topassists-tab" tabIndex={0}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Assists</span>
                <span className="d-block d-md-none">A</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Played</span>
                <span className="d-block d-md-none">P</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Assists per match</span>
                <span className="d-block d-md-none">APM</span></th>
            </tr>
          </thead>
          <tbody>
            {assistsRows && assistsRows.map((row, index) => {
              const player = row.get("PLAYERS");
              const club = row.get("TEAMS");
              const games = row.get("GAMES PLAYED");
              const assists = row.get("ASSISTS");
              const assistsMatch = row.get("ASSISTS/MATCH");

              return <tr key={index + 1}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="vstack">
                    <span className="text-primary fw-bold">{player}</span>
                    <span>{club}</span>
                  </div>
                </td>
                <td className="text-center align-middle">{assists}</td>
                <td className="text-center align-middle">{games}</td>
                <td className="text-center align-middle">{assistsMatch}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>;
}