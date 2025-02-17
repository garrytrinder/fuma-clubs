import { prisma } from "@/app/lib/prisma";
import ScoresFixtures from "./ScoresFixtures";

export const dynamic = 'force-dynamic';

export default async function Page() {
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