import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import Form from "./edit-form";
import { notFound } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>

    const { playerId, teamId } = session.user;

    const [player, platforms, positions, countries, team] = await Promise.all([
        prisma.player.findFirst({
            where: {
                id: Number(playerId)
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
        }),
        prisma.team.findFirst({
            where: {
                id: teamId
            }
        })
    ]);

    if (!player) {
        notFound();
    }

    return (
        <>
            <h1 className="text-primary">My profile</h1>
            <Form
                player={player}
                image={session.user.image || "player.svg"}
                team={team}
                platforms={platforms}
                positions={positions}
                countries={countries}
            />
        </>
    )
}