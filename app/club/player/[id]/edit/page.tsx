import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Form from "./edit-form";
import { auth } from "@/auth";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>
    if (!session.user.isCaptain) return <div>Not authorized</div>

    const teamId = session.user.isCaptainOf;

    const [player, platforms, positions, countries] = await Promise.all([
        prisma.player.findFirst({
            where: {
                id: Number(id)
            }
        }),
        prisma.platform.findMany({
            orderBy: {
                name: 'asc'
            }
        }),
        prisma.position.findMany({
            orderBy: {
                order: 'asc'
            }
        }),
        prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        })
    ]);

    if (!player) {
        notFound();
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/club">My club</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{player.discordUsername}</li>
                </ol>
            </nav>
            <h1 className="text-primary">{player.discordUsername}</h1>
            <Form
                player={player}
                platforms={platforms}
                positions={positions}
                countries={countries}
            />
        </>
    )
}