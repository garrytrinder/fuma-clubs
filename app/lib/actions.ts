"use server"

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { z } from 'zod';
import { revalidatePath } from "next/cache";

export type State = {
    errors?: {
        kitName?: string[];
        gamertag?: string[];
        primaryPositionId?: string[];
        secondaryPositionId?: string[];
        platformId?: string[];
        countryId?: string[];
    };
    message?: string | null;
    payload?: FormData;
};

const FormSchema = z.object({
    id: z.number(),
    kitName: z.string().nonempty({
        message: 'Kit name is required'
    }),
    gamertag: z.string().nonempty({
        message: 'Gamertag is required'
    }),
    primaryPositionId: z.coerce.number().gt(0, {
        message: 'Primary position is required'
    }),
    secondaryPositionId: z.coerce.number().gt(0, {
        message: 'Secondary position is required'
    }),
    platformId: z.coerce.number().gt(0, {
        message: 'Platform is required'
    }),
    countryId: z.coerce.number().gt(0, {
        message: 'Country is required'
    }),
    eaId: z.string().optional(),
    youtube: z.string().optional(),
    twitch: z.string().optional()
});

const UpdatePlayer = FormSchema.omit({ id: true });

export async function updatePlayer(
    id: number,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdatePlayer.safeParse({
        kitName: formData.get("kitName"),
        gamertag: formData.get("gamertag"),
        primaryPositionId: formData.get("primaryPositionId"),
        secondaryPositionId: formData.get("secondaryPositionId"),
        platformId: formData.get("platformId"),
        countryId: formData.get("countryId"),
        eaId: formData.get("eaId"),
        youtube: formData.get("youtube"),
        twitch: formData.get("twitch")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error',
            payload: formData
        };
    }

    try {
        await prisma.player.update({
            where: {
                id: id
            },
            data: {
                ...validatedFields.data,
                updatedAt: new Date()
            }
        });
    } catch (error) {
        return {
            message: 'There was an error updating the player'
        }
    }

    return {
        message: "Success"
    }
}

export async function updateClubPlayer(
    id: number,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdatePlayer.safeParse({
        kitName: formData.get("kitName"),
        gamertag: formData.get("gamertag"),
        primaryPositionId: formData.get("primaryPositionId"),
        secondaryPositionId: formData.get("secondaryPositionId"),
        platformId: formData.get("platformId"),
        countryId: formData.get("countryId"),
        eaId: formData.get("eaId"),
        youtube: formData.get("youtube"),
        twitch: formData.get("twitch")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error',
            payload: formData
        };
    }

    try {
        await prisma.player.update({
            where: {
                id: id
            },
            data: {
                ...validatedFields.data,
                updatedAt: new Date()
            }
        });
    } catch (error) {
        return {
            message: 'There was an error updating the player'
        }
    }

    revalidatePath('/club');
    revalidatePath('team/[id]');
    redirect('/club');
}