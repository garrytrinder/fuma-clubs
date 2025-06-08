import type { NextAdminOptions } from "@premieroctet/next-admin";

const options: NextAdminOptions = {
  title: "FUMA Clubs Admin",
  model: {
    Player: {
      toString: (player) =>
        `${player.discordUsername} ${
          player.team?.name ? `(${player.team.name})` : "(Free Agent)"
        }`,
      title: "Players",
      icon: "UsersIcon",
      list: {
        search: ["discordUsername"],
        display: ["discordUsername", "gamertag", "kitName", "team"],
      },
      edit: {
        display: ["discordUsername", "gamertag", "kitName", "team"],
      },
    },
    Team: {
      toString: (team) => team.name,
      title: "Teams",
      icon: "UserGroupIcon",
      list: {
        search: ["name"],
        display: ["name", "shortName", "active"],
      },
      edit: {
        display: ["name", "shortName", "captains", "active"],
      },
    },
  },
  forceColorScheme: "light",
  externalLinks: [
    {
      label: "FUMA Clubs",
      url: "https://fuma-clubs.vercel.app",
    },
  ],
};

export default options;
