import { auth } from "@/auth";
import { prisma } from "../lib/prisma";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>
    if (!session.user.teamId) return <div>You need to join a team</div>

    const fixtures = await prisma.fixture.findMany({
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

    return (
        <>
            <h1 className="text-primary">My fixtures</h1>
            <div className="p-3 bg-body-tertiary rounded-3">
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Deadline</th>
                                <th scope="col">Opponent</th>
                                <th scope="col">Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixtures.map(fixture => (
                                <tr key={fixture.id}>
                                    <td>{fixture.round?.end.toLocaleDateString() || ""}</td>
                                    <td>
                                        {fixture.homeTeamId === session.user.teamId
                                            ? fixture.awayTeam?.name
                                            : fixture.homeTeam?.name
                                        }
                                    </td>
                                    <td>
                                        {fixture.homeTeamId === session.user.teamId
                                            ? "Home"
                                            : "Away"
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}