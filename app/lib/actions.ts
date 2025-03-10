"use server"

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { PlayerPerformance, ResultCreateForm } from "../fixture/[id]/post-result/edit-form";
import { Result, ResultEvent, ResultPlayerPerformance } from "@prisma/client";

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

export async function createResult(
    fixtureId: number,
    prevState: any,
    formData: FormData
) {

    for (let key of formData.keys()) {
        console.log(key + ':' + formData.get(key));
    }

    let result: Result;
    try {
        console.log('Processing match result...');

        const matchResult = {
            homeTeamScore: parseInt(formData.get("homeScore") as string),
            awayTeamScore: parseInt(formData.get("awayScore") as string),
            homeTeamHalfTimeScore: parseInt(formData.get("halfTimeHomeGoals") as string) || 0,
            awayTeamHalfTimeScore: parseInt(formData.get("halfTimeAwayGoals") as string) || 0,
            homeTeamRating: parseFloat(formData.get("homeTeamRating") as string),
            awayTeamRating: parseFloat(formData.get("awayTeamRating") as string),
            homeTeamFormationId: parseInt(formData.get("homeTeamFormationId") as string),
            awayTeamFormationId: parseInt(formData.get("awayTeamFormationId") as string),
            penalties: false,
            homeTeamPenalties: null,
            awayTeamPenalties: null,
            recordingHomeGame1: formData.get("recordingHomeGame1") as string,
            recordingHomeGame2: formData.get("recordingHomeGame2") as string,
            recordingAwayGame1: formData.get("recordingAwayGame1") as string,
            recordingAwayGame2: formData.get("recordingAwayGame2") as string,
            youtubeLink: null,
            twitchLink: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        console.log(JSON.stringify(matchResult, null, 2));

        result = await prisma.result.create({
            data: {
                ...matchResult,
                Fixture: {
                    connect: {
                        id: fixtureId
                    }
                }
            }
        });

        console.log('resultId', result.id);
    } catch (error) {
        return {
            message: 'There was an error creating the result'
        }
    }

    try {
        console.log('Processing match stats');

        const homeStats = {
            resultId: result.id,
            teamId: parseInt(formData.get("homeTeamId") as string),
            shots: parseInt(formData.get("homeShots") as string),
            possession: parseInt(formData.get("homePossession") as string),
            passes: parseInt(formData.get("homePasses") as string),
            passAccuracy: parseInt(formData.get("homePassAccuracy") as string),
            tackles: parseInt(formData.get("homeTackles") as string),
            expectedGoals: parseFloat(formData.get("homeXG") as string),
            saves: parseInt(formData.get("homeSaves") as string)
        };

        const awayStats = {
            resultId: result.id,
            teamId: parseInt(formData.get("awayTeamId") as string),
            shots: parseInt(formData.get("awayShots") as string),
            possession: parseInt(formData.get("awayPossession") as string),
            passes: parseInt(formData.get("awayPasses") as string),
            passAccuracy: parseInt(formData.get("awayPassAccuracy") as string),
            tackles: parseInt(formData.get("awayTackles") as string),
            expectedGoals: parseFloat(formData.get("awayXG") as string),
            saves: parseInt(formData.get("awaySaves") as string)
        };

        console.log(JSON.stringify(homeStats, null, 2));
        console.log(JSON.stringify(awayStats, null, 2));

        await prisma.resultMatchStat.createMany({
            data: [homeStats, awayStats]
        });
    } catch (error) {
        return {
            message: 'There was an error creating the match stats'
        }
    }

    const playerPerformances = JSON.parse(formData.get("playerPerformances") as string) as PlayerPerformance[];
    const manOfTheMatch = JSON.parse(formData.get("motm") as string) as PlayerPerformance[];
    const goalKeeperCleanSheets = JSON.parse(formData.get("gkCleanSheets") as string) as PlayerPerformance[];

    try {

        console.log('Processing player performances');

        const playerPerformance = playerPerformances.map((playerPerformance) => {
            const { goals, assists, ownGoals, teamId, playerId, positionId } = playerPerformance;
            return {
                resultId: result.id,
                teamId,
                playerId,
                positionId,
                goals,
                assists,
                ownGoals,
                rating: playerPerformance.rating,
                manOfTheMatch: manOfTheMatch?.some((motm) => motm.playerId === playerPerformance.playerId),
                cleanSheet: goalKeeperCleanSheets?.some((goalkeeper) => goalkeeper.playerId === playerPerformance.playerId)
            } as ResultPlayerPerformance;
        });

        console.log(JSON.stringify(playerPerformance, null, 2));

        await prisma.resultPlayerPerformance.createMany({
            data: playerPerformance
        });

    } catch (error) {
        return {
            message: `There was an error creating the player performances - ${(error as Error).message}`
        }
    }

    try {
        console.log('Processing player events');
        console.log('Players', playerPerformances.length);

        playerPerformances.map(async (playerPerformance) => {
            const { goals, assists, ownGoals, teamId, playerId } = playerPerformance;

            console.log('Processing goals');
            if (goals > 0) {
                console.log(`Player (${playerId}) scored ${goals} goals for team (${teamId})`);
                const goalRecords = Array.from({ length: goals }, (_, i) => {
                    return {
                        eventTypeId: 2,
                        teamId,
                        playerId,
                        resultId: result.id
                    } as ResultEvent;
                });
                console.log(JSON.stringify(goalRecords, null, 2));

                await prisma.resultEvent.createMany({
                    data: goalRecords
                })
            }

            console.log('Processing assists');
            if (assists > 0) {
                console.log(`Player (${playerId}) assisted ${assists} goals for team (${teamId})`);
                const assistRecords = Array.from({ length: assists }, (_, i) => {
                    return {
                        eventTypeId: 5,
                        teamId,
                        playerId,
                        resultId: result.id,
                    } as ResultEvent;
                })

                console.log(JSON.stringify(assistRecords, null, 2));

                await prisma.resultEvent.createMany({
                    data: assistRecords
                });
            }

            console.log('Processing own goals');
            if (ownGoals > 0) {
                console.log(`Player (${playerId}) scored ${ownGoals} own goals for team (${teamId})`);
                const ownGoalRecords = Array.from({ length: ownGoals }, (_, i) => {
                    return {
                        eventTypeId: 9,
                        teamId,
                        playerId,
                        resultId: result.id
                    } as ResultEvent;
                });

                console.log(JSON.stringify(ownGoalRecords, null, 2));

                await prisma.resultEvent.createMany({
                    data: ownGoalRecords
                })
            }
        });
    } catch (error) {
        return {
            message: 'There was an error creating the player events'
        }
    }

    revalidatePath('/');

    return {
        message: 'Success!'
    }
}