import FixturesByRound from "@/app/components/fixturesByRound";
import TournamentTable from "@/app/components/tournamentTable";
import { fetchTournamentData } from "@/app/lib/data";

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id;

  const { tournamentInfo, tableRows, fixturesByRound } = await fetchTournamentData(id);

  return <>
    <h1 className="text-primary">{tournamentInfo.tournament_name}</h1>
    <TournamentTable tableRows={tableRows} />
    <FixturesByRound fixturesByRound={fixturesByRound} />
  </>;
}
