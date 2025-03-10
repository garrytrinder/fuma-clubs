import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { ResultCreateForm } from "./edit-form";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>

    const id = (await params).id;

    const fixture = await prisma.fixture.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            homeTeam: {
                include: {
                    players: {
                        orderBy: {
                            kitName: 'asc'
                        }
                    }
                }
            },
            awayTeam: {
                include: {
                    players: {
                        orderBy: {
                            kitName: 'asc'
                        }
                    }
                },
            },
            tournament: true,
            round: true
        }
    });

    const positions = await prisma.position.findMany({
        orderBy: {
            order: 'asc'
        }
    });

    const formations = await prisma.formation.findMany();

    if (!fixture) {
        return <div>Fixture not found</div>;
    }

    if (session.user.playerId !== 213) {
        return <div>Not authorised</div>
    }

    return (
        <>
            <ResultCreateForm
                fixtureId={Number(id)}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                players={[...fixture.homeTeam.players, ...fixture.awayTeam.players]}
                positions={positions}
                formations={formations}
            />
        </>
    )
}