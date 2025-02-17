import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { prisma } from "./app/lib/prisma";
import Discord from "next-auth/providers/discord";
import { Guild } from "discord.js";

declare module "next-auth" {
    interface Session {
        user: {
            playerId: number,
            teamId?: number,
            isCaptain: boolean,
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
            const guilds: Guild[] = await fetch("https://discord.com/api/users/@me/guilds", {
                headers: {
                    Authorization: `Bearer ${account?.access_token}`,
                },
            }).then((res) => res.json());

            const isMember = guilds.some((guild: Guild) => guild.id === process.env.DISCORD_GUILD_ID);

            return isMember;
        },
        session: async ({ session, user }) => {
            const currentUser = await prisma.user.findUnique({
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

            const player = await prisma.player.findUnique({
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

            return session;
        },
    }
})