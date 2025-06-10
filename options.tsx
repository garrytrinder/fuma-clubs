import type { NextAdminOptions } from "@premieroctet/next-admin";

const options: NextAdminOptions = {
  title: "FUMA Clubs Admin",
  model: {
    Country: {
      toString: (country) => country.name,
      title: "Countries",
    },
    Platform: {
      toString: (platform) => platform.name,
    },
    Player: {
      toString: (player) =>
        `${player.discordUsername} ${
          player.team?.name ? `(${player.team.name})` : "(Free Agent)"
        }`,
      title: "Players",
      icon: "UsersIcon",
      aliases: {
        kitName: "Kit name",
        discordUsername: "Discord username",
        team: "Team",
        gamertag: "Gamertag",
        platform: "Platform",
        country: "Country",
        eaId: "EA ID",
      },
      permissions: ["create", "delete", "edit"],
      list: {
        search: ["discordUsername", "gamertag", "kitName"],
        display: [
          "gamertag",
          "discordUsername",
          "kitName",
          "team",
          "platform",
          "country",
        ],
        fields: {
          team: {
            formatter: (team) => {
              return team.name;
            },
          },
          platform: {
            formatter: (platform) => {
              return platform.name;
            },
          },
          country: {
            formatter: (country) => {
              return country.name;
            },
          },
        },
      },
      edit: {
        display: [
          "discordUsername",
          "gamertag",
          "kitName",
          "team",
          "platform",
          "country",
          "eaId",
          "primaryPosition",
          "secondaryPosition",
          "twitch",
          "youtube",
        ],
        fields: {
          discordUsername: {
            required: true,
          },
          gamertag: {
            required: true,
          },
          twitch: {
            helperText: "Twitch username (e.g. user)",
          },
          youtube: {
            helperText:
              "YouTube channel name should be the part after youtube.com. For example, for https://www.youtube.com/@user, the channel name is '@user'.",
            tooltip:
              "YouTube channel name should be the part after youtube.com. For example, for https://www.youtube.com/@user, the channel name is '@user'.",
          },
        },
      },
    },
    Position: {
      toString: (position) => `${position.name} (${position.shortName})`,
      title: "Positions",
    },
    Team: {
      toString: (team) => team.name,
      title: "Teams",
      icon: "UserGroupIcon",
      aliases: {
        discordRoleId: "Discord Role ID",
        badgeUrl: "Badge URL",
      },
      list: {
        search: ["name"],
        display: ["name", "shortName", "active"],
      },
      edit: {
        display: [
          "name",
          "shortName",
          "description",
          "captains",
          "active",
          "badgeUrl",
          "discordRoleId",
        ],
        fields: {
          name: {
            required: true,
          },
          shortName: {
            required: true,
          },
          discordRoleId: {
            helperText: "Associated role in Discord",
          },
        },
      },
    },
    TeamCaptain: {
      toString: (TeamCaptain) =>
        TeamCaptain.player.gamertag || TeamCaptain.player.discordUsername,
      title: "Captains",
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
