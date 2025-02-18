import { prisma } from "@/app/lib/prisma";
import { PositionCategory } from "@prisma/client";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    const team = await prisma.team.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            players: {
                include: {
                    country: true,
                    platform: true,
                    teamCaptain: true,
                    primaryPosition: true,
                    secondaryPosition: true
                },
                orderBy: [
                    {
                        primaryPosition: {
                            order: 'asc'
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
                            <li className="list-group-item" key={`player-${index}`}>
                                <div className="d-flex w-100 py-1 justify-content-between">
                                    <span className="d-flex gap-1">
                                        <h5 className="mb-1">{player.kitName ? player.kitName : player.gamertag}</h5>
                                        {player.teamCaptain && player.teamCaptain.isClubCaptain === true &&
                                            <span className={`fs-6 badge text-bg-primary`} title="Captain">C</span>
                                        }
                                        {player.teamCaptain && player.teamCaptain.isClubCaptain === false &&
                                            <span className={`fs-6 badge text-bg-secondary`} title="Co-Captain">C</span>
                                        }
                                    </span>
                                    {player.country
                                        ? <span className="fs-6 badge text-bg-secondary" title={player.country?.name}>{player.country.emoji}</span>
                                        : <span className="fs-6 badge text-bg-secondary" title="World">🌐</span>}
                                </div>
                                <div className="d-flex w-100 py-1 justify-content-between">
                                    <h6 className="mb-1">{player.gamertag}</h6>
                                    {player.platform
                                        ? <span className="fs-6 badge text-bg-secondary"><i className={`bi bi-${player.platform.iconClass}`} title={player.platform.name}></i></span>
                                        : <span className="fs-6 badge text-bg-secondary"></span>}
                                </div>
                                <div className="d-flex w-100 py-1 justify-content-between">
                                    <span className="d-flex gap-1">
                                        {player.primaryPosition &&
                                            <span className={`fs-6 badge ${getColourForPositionCategory(player.primaryPosition.category)}`} title={player.primaryPosition.name}>{player.primaryPosition.shortName}</span>
                                        }
                                        {player.secondaryPosition &&
                                            <span className={`fs-6 badge ${getColourForPositionCategory(player.secondaryPosition.category)}`} title={player.secondaryPosition.name}>{player.secondaryPosition.shortName}</span>
                                        }
                                    </span>
                                    <span className="d-flex gap-1">
                                        {player.youtube &&
                                            <Link href={`https://youtube.com/${player.youtube}`} target="_blank" title="YouTube" className="fs-6 badge text-bg-danger">
                                                <i className="bi bi-youtube"></i>
                                            </Link>
                                        }
                                        {player.twitch &&
                                            <Link href={`https://twitch.tv/${player.twitch}`} target="_blank" title="Twitch" className="fs-6 badge bg-twitch">
                                                <i className="bi bi-twitch"></i>
                                            </Link>
                                        }
                                    </span>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </>
    );
}

function getColourForPositionCategory(positionCategory: PositionCategory | null) {
    switch (positionCategory) {
        case "Goalkeeper":
            return "bg-goalkeeper";
        case "Defender":
            return "bg-defender";
        case "Midfielder":
            return "bg-midfielder";
        case "Forward":
            return "bg-forward";
        default:
            return "bg-primary";
    }
}