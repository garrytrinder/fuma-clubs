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
                    platform: true,
                    teamCaptain: true
                },
                orderBy: [
                    {
                        teamCaptain: {
                            isClubCaptain: 'asc',
                        }
                    },
                    {
                        gamertag: 'asc'
                    }
                ]
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
            <h2 className="text-secondary">Squad</h2>
            <ul className="list-group">
                {team.players
                    .map((player, index) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={`player-${index}`}>
                                {player.gamertag}
                                <span className="w-30 d-flex justify-content-around gap-1">
                                    {player.teamCaptain && <span className="fs-5 badge text-bg-primary" title="Captain">C</span>}
                                    {player.platform
                                        ? <span className="fs-5 badge text-bg-secondary"><i className={`bi bi-${player.platform.iconClass}`} title={player.platform.name}></i></span>
                                        : <span className="fs-5 badge text-bg-secondary"></span>}

                                    {player.country
                                        ? <span className="fs-5 badge text-bg-secondary" title={player.country?.name}>{player.country.emoji}</span>
                                        : <span className="fs-5 badge text-bg-secondary" title="World">🌐</span>}
                                </span>
                            </li>
                        );
                    })}
            </ul >
        </>
    );
}