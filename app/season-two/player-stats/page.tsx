import { prisma } from "@/app/lib/prisma";
import { PlayerStats } from "./stats";

export default async function SeasonTwoTopScorersPage() {
    // Run all queries in parallel
    const [topScorersData, assistsData, topPlayersData] = await Promise.all([
        prisma.resultEvent.findMany({
            where: {
                eventType: {
                    name: 'Goal'
                },
                result: {
                    Fixture: {
                        every: {
                            tournamentId: 1
                        }
                    }
                }
            },
            include: {
                result: {
                    include: {
                        Fixture: true
                    }
                },
                player: true,
                team: true
            }
        }),
        prisma.resultEvent.findMany({
            where: {
                eventType: {
                    name: 'Assist'
                },
                result: {
                    Fixture: {
                        every: {
                            tournamentId: 1
                        }
                    }
                }
            },
            include: {
                result: {
                    include: {
                        Fixture: true
                    }
                },
                player: true,
                team: true
            }
        }),
        prisma.resultPlayerPerformance.findMany({
            where: {
                manOfTheMatch: true,
                result: {
                    Fixture: {
                        every: {
                            tournamentId: 1
                        }
                    }
                }
            },
            include: {
                result: {
                    include: {
                        Fixture: true
                    }
                },
                player: true,
                team: true
            }
        })
    ]);

    // Process top scorers data
    const topScorers = Object.values(topScorersData.reduce((acc: { [key: string]: { gamertag: string, team: string, goals: number } }, { player, team, result }) => {
        if (player.gamertag && !acc[player.gamertag]) {
            acc[player.gamertag] = {
                gamertag: player.gamertag,
                team: team.name,
                goals: 0
            }
        }

        if (player.gamertag) {
            acc[player.gamertag].goals += 1
        }

        return acc
    }, {})).sort((a, b) => b.goals - a.goals);

    // Process assists data
    const topAssists = Object.values(assistsData.reduce((acc: { [key: string]: { gamertag: string, team: string, assists: number } }, { player, team, result }) => {
        if (player.gamertag && !acc[player.gamertag]) {
            acc[player.gamertag] = {
                gamertag: player.gamertag,
                team: team.name,
                assists: 0
            }
        }

        if (player.gamertag) {
            acc[player.gamertag].assists += 1
        }

        return acc
    }, {})).sort((a, b) => b.assists - a.assists);

    // Process top players data
    const topPlayers = Object.values(topPlayersData.reduce((acc: { [key: string]: { gamertag: string, team: string, awards: number } }, { player, team, result }) => {
        if (player.gamertag && !acc[player.gamertag]) {
            acc[player.gamertag] = {
                gamertag: player.gamertag,
                team: team.name,
                awards: 0
            }
        }

        if (player.gamertag) {
            acc[player.gamertag].awards += 1
        }

        return acc
    }, {})).sort((a, b) => b.awards - a.awards);

    return <div>
        <PlayerStats topScorers={topScorers} topAssists={topAssists} topPlayers={topPlayers} />
    </div>
}
