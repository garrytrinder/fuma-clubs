import Link from "next/link";
import Image from 'next/image';
import { prisma } from "../lib/prisma";

export default async function TeamLandingPage() {

    const teams = await prisma.team.findMany({
        include: {
            captains: {
                include: {
                    player: true
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
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
            <ul className="list-group">
                {teams.map((team, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={`team-${index}`}>
                        <Link key={`team-${team.id}`} href={`team/${team.id}`}>{team.name}</Link>
                        <Image src={team.badgeUrl ? team.badgeUrl : '/badge.svg'} alt={team.name} width={35} height={35} />
                    </li>
                ))}
            </ul>
        </>
    );
}