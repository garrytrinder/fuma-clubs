import type { NextAdminOptions } from "@premieroctet/next-admin";
import Image from "next/image";

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
        search: ["discordUsername", "gamertag", "kitName"],
        display: [
          "discordUsername",
          "gamertag",
          "kitName",
          "team",
          "platform",
          "country",
          "teamCaptain",
        ],
        fields: {
          team: {
            formatter: (team) => {
              return (
                <div className="flex items-center gap-2">
                  <Image
                    src={team.badgeUrl || "/badge.svg"}
                    alt={team.name}
                    width={24}
                    height={24}
                  />
                  {team.name}
                </div>
              );
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
          teamCaptain: {
            formatter: (teamCaptain) => {
              return teamCaptain ? "Yes" : "No";
            },
          },
        },
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
