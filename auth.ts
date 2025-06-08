import { PrismaAdapter } from "@auth/prisma-adapter";
import { Guild, User } from "discord.js";
import NextAuth, { DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import { prisma } from "./app/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            playerId: number,
            teamId?: number,
            isCaptain: boolean,
            isCaptainOf?: number
        } & DefaultSession["user"]
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Discord({
        authorization: "https://discord.com/api/oauth2/authorize?scope=identify+openid+email+guilds+guilds.members.read",
        issuer: "https://discord.com",
    })],
    callbacks: {
        signIn: async ({ user, account, profile }) => {
          //scrub user data from discord as we don't need it
          user.name = "";
          user.email = "";

            const [discordUser, guilds]: [User, Guild[]] = await Promise.all([
                fetch("https://discord.com/api/users/@me", {
                    headers: {
                        Authorization: `Bearer ${account?.access_token}`,
                    },
                }).then((res) => res.json()),
                fetch("https://discord.com/api/users/@me/guilds", {
                    headers: {
                        Authorization: `Bearer ${account?.access_token}`,
                    },
                }).then((res) => res.json())
            ]);

            const isMember = guilds.some((guild: Guild) => guild.id === process.env.DISCORD_GUILD_ID);

            if (isMember) {
                // Check if player exists
                const player = await prisma.player.findFirst({
                    where: {
                        discordId: discordUser.id
                    }
                });

                // If player does not exist, create player
                if (!player) {
                    console.log("Creating player...");
                    await prisma.player.create({
                        data: {
                            discordId: discordUser.id,
                            discordUsername: discordUser.username,
                            updatedAt: new Date()
                        }
                    });
                }
            }

            return isMember;
        },
        session: async ({ session, user }) => {
            const currentUser = await prisma.user.findFirst({
                where: {
                    id: user.id
                },
                select: {
                    accounts: true
                }
            });

            if (!currentUser) {
                return session;
            }

            const player = await prisma.player.findFirst({
                where: {
                    discordId: currentUser?.accounts[0].providerAccountId
                },
                include: {
                    team: true
                }
            });

            if (!player) {
                return session;
            }

            session.user.playerId = player?.id;
            session.user.teamId = player?.team?.id;

            const isCaptain = await prisma.teamCaptain.findFirst({
                where: {
                    playerId: player?.id
                }
            });

            session.user.isCaptain = isCaptain ? true : false;
            session.user.isCaptainOf = isCaptain?.teamId;

            return session;
        },
    }
})