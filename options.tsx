import type { NextAdminOptions } from "@premieroctet/next-admin";
import { format } from "date-fns";
import { prisma } from "./app/lib/prisma";

const options: NextAdminOptions = {
  title: "FUMA Clubs Admin",
  model: {
    Country: {
      toString: (country) => country.name,
      icon: "GlobeAltIcon",
      title: "Countries",
      list: {
        display: ["id", "name", "emoji"],
      },
    },
    Fixture: {
      toString: (fixture) =>
        `${fixture.homeTeam.name} vs ${fixture.awayTeam.name} (${fixture.tournament?.name})`,
      title: "Fixtures",
      icon: "CalendarIcon",
      aliases: {
        homeTeam: "Home Team",
        awayTeam: "Away Team",
        tournament: "Tournament",
        round: "Round",
      },
      list: {
        display: [
          "id",
          "homeTeam",
          "awayTeam",
          "result",
          "tournament",
          "round",
        ],
        fields: {
          homeTeam: {
            formatter: (team) => team.name,
          },
          awayTeam: {
            formatter: (team) => team.name,
          },
          result: {
            formatter: (result) =>
              `${result.homeTeamScore} - ${result.awayTeamScore}`,
          },
          tournament: {
            formatter: (tournament) => tournament.name,
          },
          round: {
            formatter: (round) => format(new Date(round.start), "dd-MM-yyyy"),
          },
        },
        filters: [
          {
            name: "S3: All Matches",
            value: {
              AND: [
                {
                  tournament: {
                    name: "Season Three",
                  },
                },
              ],
            },
          },
          {
            name: "S3: Unplayed Matches",
            value: {
              AND: [
                {
                  tournament: {
                    name: "Season Three",
                  },
                },
                {
                  result: {
                    is: null,
                  },
                },
              ],
            },
          },
        ],
      },
      edit: {
        display: ["homeTeam", "awayTeam", "tournament", "round"],
        fields: {
          homeTeam: {
            required: true,
          },
          awayTeam: {
            required: true,
          },
          tournament: {
            required: true,
          },
          round: {
            required: true,
          },
        },
      },
    },
    Formation: {
      toString: (formation) => formation.name,
      title: "Formations",
      icon: "SquaresPlusIcon",
      list: {
        display: ["id", "name"],
        fields: {
          name: {
            formatter: (name) => name,
          },
        },
      },
    },
    Platform: {
      toString: (platform) => platform.name,
      icon: "ComputerDesktopIcon",
      list: {
        display: ["id", "name"],
      },
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
      icon: "SquaresPlusIcon",
      list: {
        display: ["name", "shortName", "order"],
        fields: {
          name: {
            formatter: (name) => name,
          },
          shortName: {
            formatter: (shortName) => shortName,
          },
        },
      },
    },
    ResultPlayerPerformance: {
      toString: (performance) =>
        `${performance.player.gamertag} (${performance.teamId}) - ${performance.rating}`,
      title: "Player Performances",
      icon: "StarIcon",
      list: {
        display: [
          "rating",
          "goals",
          "assists",
          "ownGoals",
          "cleanSheet",
          "manOfTheMatch",
          "player",
          "position",
          "result",
          "team",
        ],
        fields: {
          rating: {
            formatter: (rating) => rating?.toFixed(1),
          },
          player: {
            formatter: (player) => player.kitName || player.gamertag,
          },
          position: {
            formatter: (position) => position.name,
          },
          team: {
            formatter: (team) => team.name,
          },
          result: {
            formatter: async (result) => {
              const row = await prisma.result.findUnique({
                where: { id: result.id },
                include: {
                  Fixture: {
                    include: {
                      homeTeam: true,
                      awayTeam: true,
                      tournament: true,
                    },
                  },
                },
              });

              return (
                <>
                  {row?.Fixture?.homeTeam.name} {result.homeTeamScore}-
                  {result.awayTeamScore} {row?.Fixture?.awayTeam.name} (
                  {row?.Fixture?.tournament?.name})
                </>
              );
            },
          },
        },
        filters: [
          {
            name: "No fixture",
            value: {
              result: {
                Fixture: {
                  is: null,
                },
              },
            },
          },
        ],
      },
    },
    ResultEvent: {
      toString: (event) =>
        `${event.player.gamertag} (${event.team.name}) - ${event.eventType.name}`,
      title: "Events",
      icon: "NumberedListIcon",
      aliases: {
        id: "ID",
        player: "Player",
        eventType: "Event Type",
      },
      list: {
        display: ["id", "player", "team", "eventType", "result"],
        filters: [
          {
            name: "No fixture",
            value: {
              result: {
                Fixture: {
                  is: null,
                },
              },
            },
          },
        ],
        fields: {
          result: {
            formatter: async (result) => {
              const row = await prisma.result.findUnique({
                where: { id: result.id },
                include: {
                  Fixture: {
                    include: {
                      homeTeam: true,
                      awayTeam: true,
                      tournament: true,
                    },
                  },
                },
              });

              return (
                <>
                  {row?.Fixture?.homeTeam.name} {result.homeTeamScore}-
                  {result.awayTeamScore} {row?.Fixture?.awayTeam.name} (
                  {row?.Fixture?.tournament?.name})
                </>
              );
            },
          },
          player: {
            formatter: (player) => player.kitName || player.gamertag,
          },
          eventType: {
            formatter: (eventType) => eventType.name,
          },
          team: {
            formatter: (team) => team.name,
          },
        },
      },
    },
    Result: {
      toString: (result) => `${result.homeTeamScore} - ${result.awayTeamScore}`,
      title: "Results",
      aliases: {
        homeTeamScore: "Home Team Score",
        awayTeamScore: "Away Team Score",
        Fixture: "Fixture",
      },
      list: {
        display: ["id", "Fixture", "homeTeamScore", "awayTeamScore"],
        fields: {
          Fixture: {
            formatter: (fixture) =>
              `${fixture.homeTeam.name} vs ${fixture.awayTeam.name} (${fixture.tournament?.name})`,
          },
          homeTeamScore: {
            formatter: (score) => score,
          },
          awayTeamScore: {
            formatter: (score) => score,
          },
        },
        filters: [
          {
            name: "Season Three",
            value: {
              Fixture: {
                tournament: {
                  id: 3,
                },
              },
            },
          },
        ],
      },
      edit: {
        display: [
          "Fixture",
          "homeTeamHalfTimeScore",
          "awayTeamHalfTimeScore",
          "homeTeamScore",
          "awayTeamScore",
          "homeTeamFormation",
          "awayTeamFormation",
        ],
        fields: {
          Fixture: {
            optionFormatter(item) {
              return `${item.homeTeam.name} vs ${item.awayTeam.name} (${item.tournament?.name})`;
            },
          },
        },
      },
    },
    Round: {
      title: "Rounds",
      icon: "CalendarIcon",
      toString: (round) =>
        `${format(new Date(round.start), "dd-MM-yyyy")} - ${format(
          new Date(round.end),
          "dd-MM-yyyy"
        )} (${round.tournaments[0]?.name})`,
      list: {
        display: ["start", "end", "tournaments"],
        fields: {
          start: {
            formatter: (date) => new Date(date).toLocaleDateString(),
          },
          end: {
            formatter: (date) => new Date(date).toLocaleDateString(),
          },
        },
      },
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
    Tournament: {
      toString: (tournament) => tournament.name,
      title: "Tournaments",
      icon: "TrophyIcon",
      list: {
        display: ["id", "name"],
      },
    },
  },
  pages: {
    "/cache": {
      title: "Clear cache",
      icon: "PresentationChartBarIcon",
    },
  },
  externalLinks: [
    {
      label: "FUMA Clubs",
      url: "https://fuma-clubs.vercel.app",
    },
  ],
  sidebar: {
    groups: [
      {
        title: "FUMA Clubs",
        models: ["Player", "Team", "Fixture"],
      },
      {
        title: "Settings",
        models: ["Country", "Platform", "Position"],
      },
    ],
  },
  defaultColorScheme: "system",
};

export default options;
