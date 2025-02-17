import Link from "next/link";
import Image from 'next/image';
import { prisma } from "../lib/prisma";

export default async function Page() {

    const teams = await prisma.team.findMany({
        include: {
            captains: {
                include: {
                    player: true
                }
            },
            players: true
        },
        orderBy: [
            {
                active: 'desc'
            },
            {
                name: 'asc'
            }
        ]
    });

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Teams</li>
                </ol>
            </nav>
            <h1 className="text-primary">Teams</h1>
            <div className="list-group">
                {teams.map((team, index) => {
                    const playerCount = team.players.length;
                    const captain = team.captains.find(captain => captain.isClubCaptain === true && captain.teamId === team.id);

                    return (
                        <Link key={`team-${team.id}`} href={`team/${team.id}`} className={`list-group-item list-group-item-action ${!team.active ? 'disabled' : ''}`}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{team.name}</h5>
                                <Image src={team.badgeUrl ? team.badgeUrl : '/badge.svg'} alt={team.name} width={35} height={35} />
                            </div>
                            <div className="d-flex gap-1">
                                {team.active
                                    ? <span className="badge rounded-pill bg-success">Active</span>
                                    : <span className="badge rounded-pill bg-danger">Inactive</span>
                                }
                                {team.recruiting
                                    ? <span className="badge rounded-pill bg-info">Recruiting</span>
                                    : null
                                }
                            </div>
                            <div className="d-flex gap-1">
                                <small className="text-body-secondary">{playerCount} players</small>
                            </div>
                            {captain
                                ? <div className="d-flex gap-1">
                                    <small className="text-body-secondary">Club captain: {captain.player.gamertag}</small>
                                </div>
                                : null
                            }
                        </Link>
                    )
                })}
            </div>
        </>
    );
}