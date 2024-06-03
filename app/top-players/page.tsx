import { getGoogleSpreadsheet, GoogleSpreadsheets, GoogleSheets } from "../data/google-sheets";

export const dynamic = 'force-dynamic';

export default async function TopPlayersPage() {
  const googleSpreadsheet = await getGoogleSpreadsheet(GoogleSpreadsheets.PostResults);
  const rows = (await googleSpreadsheet.sheetsById[GoogleSheets.Overall].getRows()).filter(row => row.get("PLAYERS") !== "");

  const goalsRows = rows.filter(row => row.get("GOALS") > 0);
  goalsRows.sort((a, b) => {
    const goalsA = a.get("GOALS");
    const goalsB = b.get("GOALS");
    const gamesA = a.get("GAMES PLAYED");
    const gamesB = b.get("GAMES PLAYED");

    return goalsB - goalsA || gamesA - gamesB || a.get("PLAYERS").localeCompare(b.get("PLAYERS"));
  });

  const assistsRows = rows.filter(row => row.get("ASSISTS") > 0);
  assistsRows.sort((a, b) => {
    const assistsA = a.get("ASSISTS");
    const assistsB = b.get("ASSISTS");
    const gamesA = a.get("GAMES PLAYED");
    const gamesB = b.get("GAMES PLAYED");

    return assistsB - assistsA || gamesA - gamesB || a.get("PLAYERS").localeCompare(b.get("PLAYERS"));
  });

  const ratingsRows = rows.filter(row => row.get("GAMES PLAYED") > 0)
  ratingsRows.sort((a, b) => {
    const ratingA = parseFloat((a.get("RATING") as string).replace(",", "."));
    const ratingB = parseFloat((b.get("RATING") as string).replace(",", "."));
    const gamesA = a.get("GAMES PLAYED");
    const gamesB = b.get("GAMES PLAYED");

    return ratingB - ratingA || gamesA - gamesB || a.get("PLAYERS").localeCompare(b.get("PLAYERS"));
  });

  const cleanSheetsRows = rows.filter(row => row.get("CLEAN SHEET") > 0);
  cleanSheetsRows.sort((a, b) => {
    const cleanSheetsA = a.get("CLEAN SHEET");
    const cleanSheetsB = b.get("CLEAN SHEET");
    const gamesA = a.get("GAMES PLAYED");
    const gamesB = b.get("GAMES PLAYED");

    return cleanSheetsB - cleanSheetsA || gamesA - gamesB || a.get("PLAYERS").localeCompare(b.get("PLAYERS"));
  });

  const manOfTheMatchRows = rows.filter(row => row.get("MOTM") > 0);
  manOfTheMatchRows.sort((a, b) => {
    const motmA = a.get("MOTM");
    const motmB = b.get("MOTM");
    const gamesA = a.get("GAMES PLAYED");
    const gamesB = b.get("GAMES PLAYED");

    return motmB - motmA || gamesA - gamesB || a.get("PLAYERS").localeCompare(b.get("PLAYERS"));
  });

  const redCardRows = rows.filter(row => row.get("RED CARD") > 0);
  redCardRows.sort((a, b) => {
    const redCardA = a.get("RED CARD");
    const redCardB = b.get("RED CARD");
    const gamesA = a.get("GAMES PLAYED");
    const gamesB = b.get("GAMES PLAYED");

    return redCardB - redCardA || gamesA - gamesB || a.get("PLAYERS").localeCompare(b.get("PLAYERS"));
  });

  return <>
    <h1 className="text-primary">Top Players</h1>
    <p></p>
    <ul className="nav nav-underline">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#" id="scorers-tab" data-bs-toggle="tab" data-bs-target="#scorers-tab-pane" type="button" role="tab" aria-controls="scorers-tab-pane" aria-selected="true">Scorers</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" id="assists-tab" data-bs-toggle="tab" data-bs-target="#assists-tab-pane" type="button" role="tab" aria-controls="assists-tab-pane" aria-selected="true">Assists</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" id="cleansheets-tab" data-bs-toggle="tab" data-bs-target="#cleansheets-tab-pane" type="button" role="tab" aria-controls="cleansheets-tab-pane" aria-selected="true">Clean Sheets</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" id="ratings-tab" data-bs-toggle="tab" data-bs-target="#ratings-tab-pane" type="button" role="tab" aria-controls="ratings-tab-pane" aria-selected="true">Ratings</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" id="motm-tab" data-bs-toggle="tab" data-bs-target="#motm-tab-pane" type="button" role="tab" aria-controls="motm-tab-pane" aria-selected="true">Man of the Match</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" id="redcards-tab" data-bs-toggle="tab" data-bs-target="#redcards-tab-pane" type="button" role="tab" aria-controls="redcards-tab-pane" aria-selected="true">Red Cards</a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane active" id="scorers-tab-pane" role="tabpanel" aria-labelledby="scorers-tab" tabIndex={0}>
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
              const goalsMatch = (goals / games).toFixed(2);

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
      <div className="tab-pane" id="assists-tab-pane" role="tabpanel" aria-labelledby="assists-tab" tabIndex={0}>
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
              const assistsMatch = (assists / games).toFixed(2);

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
      <div className="tab-pane" id="cleansheets-tab-pane" role="tabpanel" aria-labelledby="cleansheets-tab" tabIndex={0}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Clean Sheets</span>
                <span className="d-block d-md-none">CS</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Played</span>
                <span className="d-block d-md-none">P</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {cleanSheetsRows && cleanSheetsRows.map((row, index) => {
              const player = row.get("PLAYERS");
              const club = row.get("TEAMS");
              const games = row.get("GAMES PLAYED");
              const cleanSheets = row.get("CLEAN SHEET");

              return <tr key={index + 1}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="vstack">
                    <span className="text-primary fw-bold">{player}</span>
                    <span>{club}</span>
                  </div>
                </td>
                <td className="text-center align-middle">{cleanSheets}</td>
                <td className="text-center align-middle">{games}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className="tab-pane" id="ratings-tab-pane" role="tabpanel" aria-labelledby="ratings-tab" tabIndex={0}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Rating</span>
                <span className="d-block d-md-none">R</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Played</span>
                <span className="d-block d-md-none">P</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ratingsRows && ratingsRows.map((row, index) => {
              const player = row.get("PLAYERS");
              const club = row.get("TEAMS");
              const games = row.get("GAMES PLAYED");
              const rating = row.get("RATING").replace(",", ".");

              return <tr key={index + 1}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="vstack">
                    <span className="text-primary fw-bold">{player}</span>
                    <span>{club}</span>
                  </div>
                </td>
                <td className="text-center align-middle">{rating}</td>
                <td className="text-center align-middle">{games}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className="tab-pane" id="redcards-tab-pane" role="tabpanel" aria-labelledby="redcards-tab" tabIndex={0}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Red Cards</span>
                <span className="d-block d-md-none">RC</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {redCardRows && redCardRows.map((row, index) => {
              const player = row.get("PLAYERS");
              const club = row.get("TEAMS");
              const games = row.get("GAMES PLAYED");
              const redCards = row.get("RED CARD");

              return <tr key={index + 1}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="vstack">
                    <span className="text-primary fw-bold">{player}</span>
                    <span>{club}</span>
                  </div>
                </td>
                <td className="text-center align-middle">{redCards}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className="tab-pane" id="motm-tab-pane" role="tabpanel" aria-labelledby="motm-tab" tabIndex={0}>
      <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Man of the Match</span>
                <span className="d-block d-md-none">MOTM</span>
              </th>
              <th className="text-secondary text-center">
                <span className="d-none d-md-block">Played</span>
                <span className="d-block d-md-none">P</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {manOfTheMatchRows && manOfTheMatchRows.map((row, index) => {
              const player = row.get("PLAYERS");
              const club = row.get("TEAMS");
              const games = row.get("GAMES PLAYED");
              const motm = row.get("MOTM");

              return <tr key={index + 1}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="vstack">
                    <span className="text-primary fw-bold">{player}</span>
                    <span>{club}</span>
                  </div>
                </td>
                <td className="text-center align-middle">{motm}</td>
                <td className="text-center align-middle">{games}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>;
}