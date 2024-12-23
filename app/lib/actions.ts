"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
    const rawFormData = {
        discordId: formData.get('discordId'),
        platformId: formData.get('platformId'),
        gamertag: formData.get('gamertag'),
        eaId: formData.get('eaId'),
        country: formData.get('countryId'),
        teamId: formData.get('teamId'),
        youtube: formData.get('youtube'),
        Twitch: formData.get('twitch')
    };

    await prisma.player.update({
        where: {
            discordId: rawFormData.discordId as string
        },
        data: {
            platformId: parseInt(rawFormData.platformId as string),
            gamertag: rawFormData.gamertag as string,
            eaId: rawFormData.eaId as string,
            countryId: parseInt(rawFormData.country as string),
            youtube: formData.get('youtube') as string,
            twitch: formData.get('twitch') as string,
            updatedAt: new Date()
        }
    });

    revalidatePath('/profile');
    redirect('/profile');
}

export async function editProfile() {
    redirect('/profile/edit');
}