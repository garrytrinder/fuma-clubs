import { prisma } from "@/app/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function SeasonTwoTablePage() {
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

    const tableData = tournament?.rounds.flatMap(round => round.fixtures).reduce((acc: { [key: number]: any }, fixture) => {
        const homeTeam = acc[fixture.homeTeam.id] || {
            name: fixture.homeTeam.name,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0
        };
        const awayTeam = acc[fixture.awayTeam.id] || {
            name: fixture.awayTeam.name,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0
        };

        if (fixture.result) {
            homeTeam.played += 1;
            awayTeam.played += 1;
            homeTeam.goalsFor += fixture.result.homeTeamScore;
            homeTeam.goalsAgainst += fixture.result.awayTeamScore;
            awayTeam.goalsFor += fixture.result.awayTeamScore;
            awayTeam.goalsAgainst += fixture.result.homeTeamScore;

            if (fixture.result.homeTeamScore > fixture.result.awayTeamScore) {
                homeTeam.wins += 1;
                homeTeam.points += 3;
                awayTeam.losses += 1;
            } else if (fixture.result.homeTeamScore < fixture.result.awayTeamScore) {
                awayTeam.wins += 1;
                awayTeam.points += 3;
                homeTeam.losses += 1;
            } else {
                homeTeam.draws += 1;
                homeTeam.points += 1;
                awayTeam.draws += 1;
                awayTeam.points += 1;
            }
        }

        acc[fixture.homeTeam.id] = homeTeam;
        acc[fixture.awayTeam.id] = awayTeam;

        return acc;
    }, {});

    const sortedTableData = Object.values(tableData ?? {}).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const goalDifferenceA = a.goalsFor - a.goalsAgainst;
        const goalDifferenceB = b.goalsFor - b.goalsAgainst;
        if (goalDifferenceB !== goalDifferenceA) return goalDifferenceB - goalDifferenceA;
        return b.goalsFor - a.goalsFor;
    });

    return <>
        <h1 className="text-primary">{tournament?.name}</h1>
        <h2 className="text-secondary">Table</h2>

        <table className="table">
            <thead>
                <tr>
                    <th className="text-secondary">Pos</th>
                    <th className="text-secondary">Team</th>
                    <th className="text-secondary text-center">P</th>
                    <th className="text-secondary text-center">W</th>
                    <th className="text-secondary text-center">D</th>
                    <th className="text-secondary text-center">L</th>
                    <th className="text-secondary text-center d-none d-sm-table-cell">GF</th>
                    <th className="text-secondary text-center d-none d-sm-table-cell">GA</th>
                    <th className="text-secondary text-center">GD</th>
                    <th className="text-secondary text-center">Pts</th>
                </tr>
            </thead>
            <tbody>
                {sortedTableData.map((team, index) => {
                    return (
                        <tr key={team.name} className={`${index === 0 ? "text-primary" : ""}`}>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{index + 1}</td>
                            <td className={index === 0 ? "text-primary" : ""}>{team.name}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.played}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.wins}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.draws}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.losses}</td>
                            <td className={`text-center d-none d-sm-table-cell ${index === 0 ? "text-primary" : ""}`}>{team.goalsFor}</td>
                            <td className={`text-center d-none d-sm-table-cell ${index === 0 ? "text-primary" : ""}`}>{team.goalsAgainst}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.goalsFor - team.goalsAgainst}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
}