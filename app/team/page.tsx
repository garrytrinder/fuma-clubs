import Link from "next/link";
import { prisma } from "../lib/prisma";

export default async function TeamLandingPage() {

    const teams = await prisma.team.findMany({
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={index}>
                            <td><Link href={`team/${team.id}`} >{team.name}</Link></td>
                            <td>{team.shortName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}