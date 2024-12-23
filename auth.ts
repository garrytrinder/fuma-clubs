import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./app/lib/prisma";
import Discord from "next-auth/providers/discord";
import { Guild } from "discord.js";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Discord({
        authorization: "https://discord.com/api/oauth2/authorize?scope=email+guilds+guilds.members.read",
        issuer: "https://discord.com"
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
    },
})