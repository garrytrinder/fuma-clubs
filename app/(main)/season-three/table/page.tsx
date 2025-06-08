import { prisma } from "@/app/lib/prisma";
import { TournamentTable } from "./table";

export default async function Page() {
    const tournament = await prisma.tournament.findFirst({
        where: {
            id: 3
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
            badgeUrl: fixture.homeTeam.badgeUrl,
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
            badgeUrl: fixture.awayTeam.badgeUrl,
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

        <TournamentTable tableData={sortedTableData} />
    </>
}