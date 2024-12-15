import FixturesByRound from "@/app/components/fixturesByRound";
import TournamentTable from "@/app/components/tournamentTable";
import { fetchTournamentData } from "@/app/lib/data";

interface PageProps {
    id: string;
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<PageProps>
}) {
  const id = parseInt((await params).id, 10);

  const { tournamentInfo, tableRows, fixturesByRound } = await fetchTournamentData(id);

  return <>
    <h1 className="text-primary">{tournamentInfo.tournament_name}</h1>
    <TournamentTable tableRows={tableRows} />
    <FixturesByRound fixturesByRound={fixturesByRound} />
  </>;
}
