import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { ProfileEditForm } from "./form";
import Link from "next/link";

export default async function EditProfilePage() {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>

    const [player, platforms, countries] = await Promise.all([
        prisma.player.findUnique({
            where: {
                id: session.user.playerId
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
                    <li className="breadcrumb-item"><Link href="/profile">Profile</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div className="p-3 bg-body-tertiary rounded-3">
                {player && session.user.image &&
                    <ProfileEditForm
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