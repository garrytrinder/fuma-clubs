import { SheetIds, getGoogleSpreadsheet } from "@/app/data/google-sheets";
import Link from "next/link";
import Image from "next/image";

export default async function TeamPage({ params }: { params: { name: string } }) {
  const team = params.name.replaceAll('-', ' ');

  const googleSpreadsheet = await getGoogleSpreadsheet();
  const playersSheet = googleSpreadsheet.sheetsById[SheetIds.Players];
  const teamSheet = googleSpreadsheet.sheetsById[SheetIds.Teams];

  const playersSheetRows = await playersSheet.getRows();
  const players = playersSheetRows.filter((row) => {
    if (row.get("Team")?.toLowerCase() === team.toLowerCase()) {
      return row;
    }
  });

  const teamsSheetRows = await teamSheet.getRows();
  const teamRow = teamsSheetRows.find((row) => {
    if (row.get("Teams")?.toLowerCase() === team.toLowerCase()) {
      return row;
    }
  });
  const hasCrest = teamRow?.get("Crest") !== undefined && teamRow?.get("Crest") !== "";

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
    <h2 className="text-secondary">Players</h2>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {players && players.map((player, index) => {
          return (
            <tr key={index + 1}>
              <td>{player.get("PSN ID / Gamertag / Origin username")}</td>
              <td className="text-end"><i className={`bi bi-${getPlatformIcon(player.get("Gaming Platform"))} text-primary`}></i></td>
            </tr>
          )
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