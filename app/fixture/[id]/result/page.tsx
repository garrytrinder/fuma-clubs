import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { ResultEditForm } from "./edit-form";

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

    if (!fixture) {
        return <div>Fixture not found</div>;
    }

    if (session.user.teamId !== fixture.homeTeamId && session.user.teamId !== fixture.awayTeamId) {
        return <div>Access denied</div>;
    }

    return (
        <>
            <ResultEditForm
                resultId={id}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                players={[...fixture.homeTeam.players, ...fixture.awayTeam.players]}
            />
        </>
    )
}