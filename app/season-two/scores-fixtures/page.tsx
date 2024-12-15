import { prisma } from "@/app/lib/prisma";

export default async function SeasonTwoScoresFixturesPage() {

    const tournament = await prisma.tournament.findUnique({
        where: {
            id: 1
        },
        include: {
            rounds: {
                orderBy: {
                    start: 'asc'
                },
                include: {
                    fixtures: {
                        include: {
                            homeTeam: true,
                            awayTeam: true,
                            result: true
                        },
                        orderBy: {
                            id: 'asc'
                        }
                    }
                }
            }
        },
    });

    return <>
        <h1 className="text-primary">{tournament?.name}</h1>
        <h2 className="text-secondary">Scores and fixtures</h2>

        {tournament?.rounds.map((round, index) => (
            <div className="py-2" key={round.id}>
                <h3 className="text-primary text-center">Round {index + 1}</h3>
                <p className="text-secondary text-center">({round.start.toLocaleDateString()} - {round.end.toLocaleDateString()})</p>
                <ul className="list-group" key={round.id}>
                    {round.fixtures.map((fixture, index) =>
                        <li className="list-group-item" key={index}>
                            <div className="fluid-container">
                                <div className="row py-2">
                                    <div className="col text-end">
                                        {fixture.homeTeam.name}
                                    </div>
                                    <div className="col-2 p-0 text-center">
                                        {fixture.result ? `${fixture.result.homeTeamScore} - ${fixture.result.awayTeamScore}` : 'vs'}
                                    </div>
                                    <div className="col text-start">
                                        {fixture.awayTeam.name}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        ))}
    </>
}