"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
    const rawFormData = {
        playerId: formData.get('playerId'),
        discordId: formData.get('discordId'),
        platformId: formData.get('platformId'),
        gamertag: formData.get('gamertag'),
        eaId: formData.get('eaId'),
        country: formData.get('countryId'),
        teamId: formData.get('teamId'),
        youtube: formData.get('youtube'),
        twitch: formData.get('twitch')
    };

    await prisma.player.update({
        where: {
            id: parseInt(rawFormData.playerId as string)
        },
        data: {
            platformId: parseInt(rawFormData.platformId as string) || null,
            gamertag: rawFormData.gamertag as string || null,
            eaId: rawFormData.eaId as string || null,
            countryId: parseInt(rawFormData.country as string) || null,
            youtube: rawFormData.youtube as string || null,
            twitch: rawFormData.twitch as string || null,
            updatedAt: new Date()
        }
    });

    revalidatePath(`/profile/${rawFormData.playerId}`);
    redirect(`/profile/${rawFormData.playerId}`);
}