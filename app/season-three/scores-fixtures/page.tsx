import { prisma } from "@/app/lib/prisma";
import ScoresFixtures from "./ScoresFixtures";

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
                            result: {
                                include: {
                                    ResultPlayerPerformance: {
                                        include: {
                                            player: true
                                        }
                                    },
                                    ResultEvent: {
                                        include: {
                                            player: true,
                                            eventType: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: {
                            id: 'asc'
                        }
                    }
                }
            }
        },
    });

    return <ScoresFixtures tournament={tournament} />;
}