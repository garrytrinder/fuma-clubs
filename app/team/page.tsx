import Link from "next/link";
import Image from 'next/image';
import { prisma } from "../lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Page() {

    const data = await prisma.team.findMany({
        where: {
            active: true
        },
        include: {
            captains: {
                include: {
                    player: true
                }
            },
            players: true,
        },
        orderBy: [
            {
                name: 'asc'
            }
        ]
    });

    const teams = data.map(team => {
        return {
            id: team.id,
            image: team.badgeUrl,
            name: team.name
        } as Team;
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
            <TeamList teams={teams} />
        </>
    );
}

interface Team {
    id: number;
    image: string;
    name: string;
}

const TeamList = ({ teams }: { teams: Team[] }) =>
    <div className="list-group">
        {teams.map((team, index) => {
            return (
                <Team key={`team-${team.id}`} id={team.id} name={team.name} image={team.image} />
            )
        })}
    </div>

const Team = ({ id, name, image, }: { id: number, name: string, image: string }) =>
    <Link href={`team/${id}`} className="list-group-item list-group-item-action">
        <div className="d-flex align-items-center gap-4">
            <div className="">
                <Image src={image ? image : '/badge.svg'} alt={name} width={50} height={50} /></div>
            <div className="fs-5">
                {name}
            </div>
        </div>
    </Link>
