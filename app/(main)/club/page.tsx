import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>
    if (!session.user.isCaptain) return <div>Not authorized</div>

    const teamId = session.user.isCaptainOf;

    const team = await prisma.team.findFirst({
        where: {
            id: teamId
        }
    });

    const players = await prisma.player.findMany({
        where: {
            teamId
        },
        include: {
            platform: true,
            country: true,
            primaryPosition: true,
            secondaryPosition: true
        }
    });

    if (!team) {
        return <div>Team not found</div>
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">My club</li>
                </ol>
            </nav>
            <h1 className="text-primary">My club</h1>
            <h2 className="text-secondary">{team?.name}</h2>
            <div className="p-3 bg-body-tertiary rounded-3">
                <div className="mb-3">
                    <div className="text-center">
                        <Image src={team.badgeUrl || 'badge.svg'} alt={team.name} width={100} height={100} className="rounded-circle text-center" />
                    </div>
                </div>
            </div>
            <h2 className="text-secondary">Squad</h2>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Kit name</th>
                            <th scope="col">Gamertag</th>
                            <th scope="col">Platform</th>
                            <th scope="col">Country</th>
                            <th scope="col">Positions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player.id}>
                                <td>
                                    <Link href={`club/player/${player.id}/edit`} className="btn btn-primary">Edit</Link>
                                </td>
                                <td>{player.kitName
                                    ? player.kitName
                                    : <span className="text-danger"><i className="bi bi-exclamation-triangle"></i></span>}
                                </td>
                                <td>{player.gamertag
                                    ? player.gamertag
                                    : <span className="text-danger"><i className="bi bi-exclamation-triangle"></i></span>}
                                </td>
                                <td>{player.platform
                                    ? player.platform.name
                                    : <span className="text-danger"><i className="bi bi-exclamation-triangle"></i></span>}
                                </td>
                                <td>
                                    {player.country
                                        ? player.country.name
                                        : <span className="text-danger"><i className="bi bi-exclamation-triangle"></i></span>}
                                </td>
                                <td>
                                    {player.primaryPosition
                                        ? <span className="badge">{player.primaryPosition.shortName}</span>
                                        : <span className="text-danger"><i className="bi bi-exclamation-triangle"></i></span>}

                                    {player.secondaryPosition
                                        ? <span className="badge">{player.secondaryPosition.shortName}</span>
                                        : <span className="text-danger"><i className="bi bi-exclamation-triangle"></i></span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}