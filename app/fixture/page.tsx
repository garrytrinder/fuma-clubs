import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import { FixtureTable } from "./table";
import { FixtureRow } from "./table";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>
    if (!session.user.teamId) return <div>You need to join a team</div>

    const data = await prisma.fixture.findMany({
        where: {
            OR: [
                {
                    homeTeamId: session.user.teamId
                },
                {
                    awayTeamId: session.user.teamId
                }
            ],
            AND: {
                result: null
            }
        },
        include: {
            tournament: true,
            round: true,
            homeTeam: true,
            awayTeam: true,
        },
        orderBy: {
            round: {
                start: 'asc'
            }
        }
    });

    const fixtures = data.map(fixture => {
        return {
            id: fixture.id,
            deadline: fixture.round?.end,
            opponent: fixture.homeTeamId === session.user.teamId ? fixture.awayTeam.name : fixture.homeTeam.name,
            venue: fixture.homeTeamId === session.user.teamId ? 'Away' : 'Home'
        } as FixtureRow;
    });

    return (
        <>
            <h1 className="text-primary">My fixtures</h1>
            <FixtureTable
                isCaptain={session.user.isCaptain}
                fixtures={fixtures}
            />
        </>
    )
}