import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function TeamPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    const team = await prisma.team.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            players: {
                include: {
                    country: true,
                    platform: true
                },
                orderBy: {
                    gamertag: 'asc'
                }
            }
        },
    });

    if (!team) {
        return <div>Team not found</div>;
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/team">Teams</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{team.name}</li>
                </ol>
            </nav>
            <h1 className="text-primary">{team.name}</h1>
            <h2 className="text-secondary">Players</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Gamertag</th>
                            <th>Platform</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.players.map((player, index) => (
                            <tr key={index}>
                                <td>{player.gamertag}</td>
                                <td>{player.platform?.name || ''}</td>
                                <td>{player.country ? `${player.country.name} ${player.country.emoji}` : ''} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}