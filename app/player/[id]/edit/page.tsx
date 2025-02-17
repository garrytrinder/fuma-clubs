import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import Form from "./edit-form";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>

    const { id } = (await params);

    const [player, platforms, countries] = await Promise.all([
        prisma.player.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                team: true
            }
        }),
        prisma.platform.findMany({
            orderBy: {
                name: 'asc'
            }
        }),
        prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        })
    ]);

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href={`/profile/${session.user.playerId}`}>Profile</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div className="p-3 bg-body-tertiary rounded-3">
                {player && session.user.image &&
                    <Form
                        image={session.user.image}
                        player={player}
                        platforms={platforms}
                        team={player.team}
                        countries={countries}
                    />
                }
            </div>
        </>
    )

}