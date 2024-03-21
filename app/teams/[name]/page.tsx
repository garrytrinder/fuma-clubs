import { SheetIds, getGoogleSpreadsheet } from "@/app/data/google-sheets";
import Link from "next/link";
import Image from "next/image";

export default async function TeamPage({ params }: { params: { name: string } }) {
  const team = params.name.replaceAll('-', ' ');

  const googleSpreadsheet = await getGoogleSpreadsheet();
  const playersSheet = googleSpreadsheet.sheetsById[SheetIds.Players];
  const teamSheet = googleSpreadsheet.sheetsById[SheetIds.Teams];
  const hofSheet = googleSpreadsheet.sheetsById[SheetIds.HallOfFame];

  const playersSheetRows = await playersSheet.getRows();
  const players = playersSheetRows.filter((row) => {
    if (row.get("Team")?.toLowerCase() === team.toLowerCase()) {
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

  const captain = players.find((player) => {
    if (player.get("Captain")?.toLowerCase() === "yes") {
      return player;
    }
  });

  const teamsSheetRows = await teamSheet.getRows();
  const teamRow = teamsSheetRows.find((row) => {
    if (row.get("Teams")?.toLowerCase() === team.toLowerCase()) {
      return row;
    }
  });
  const hasCrest = teamRow?.get("Crest") !== undefined && teamRow?.get("Crest") !== "";

  const hofSheetRows = await hofSheet.getRows();
  const trophies = hofSheetRows.filter((row) => {
    if (row.get("Team")?.toLowerCase() === team.toLowerCase()) {
      return row;
    }
  });
  const hasTrophies = trophies.length > 0;

  return <>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link href="/teams">Teams</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{teamRow?.get("Teams")}</li>
      </ol>
    </nav>
    <h1 className="text-primary">{teamRow?.get("Teams")}</h1>
    {hasCrest &&
      <div className="text-center my-5">
        <Image src={teamRow?.get("Crest")} alt={`${teamRow?.get("Teams")}`} height={150} width={150}></Image>
      </div>
    }
    {
      hasTrophies && <>
        <h2 className="text-secondary">Trophy Room</h2>
        <div className="row my-5">
          {trophies.map((trophy, index) => {
            return (
              <div key={`trophy-${index}`} className="col-3 mb-3 mb-sm-0">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="bi bi-trophy-fill text-warning display-4"></i>
                    <h5 className="card-title mt-3">{trophy.get("Name")}</h5>
                    <p className="card-text">{trophy.get("Date")}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    }
    <h2 className="text-secondary">Squad</h2>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {captain && (
          <tr>
            <td className="text-primary">{captain.get("PSN ID / Gamertag / Origin username")} (C)</td>
            <td className="text-end"><i className={`bi bi-${getPlatformIcon(captain.get("Gaming Platform"))} text-primary`}></i></td>
          </tr>
        )}
        {players && players.map((player, index) => {
          return player.get("Captain")?.toLowerCase() === "no" ?
            (
              <tr key={index + 1}>
                <td>{player.get("PSN ID / Gamertag / Origin username")}</td>
                <td className="text-end"><i className={`bi bi-${getPlatformIcon(player.get("Gaming Platform"))} text-primary`}></i></td>
              </tr>
            ) : null
        })}
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