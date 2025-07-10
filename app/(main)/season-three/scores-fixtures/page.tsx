import { prisma } from "@/app/lib/prisma";
import { Tournament } from "@prisma/client";
import Image from "next/image";

type TournamentWithRounds = Tournament & {
  rounds: Array<{
    id: number;
    start: Date;
    end: Date;
    fixtures: Array<{
      id: number;
      homeTeamId: number;
      awayTeamId: number;
      homeTeam: { id: number; name: string; badgeUrl: string | null };
      awayTeam: { id: number; name: string; badgeUrl: string | null };
      result: {
        homeTeamScore: number;
        awayTeamScore: number;
        homeTeamHalfTimeScore: number | null;
        awayTeamHalfTimeScore: number | null;
        ResultPlayerPerformance: Array<{
          id: number;
          teamId: number;
          playerId: number;
          goals: number | null;
          assists: number | null;
          rating: number | null;
          manOfTheMatch: boolean;
          player: {
            id: number;
            gamertag: string | null;
            discordUsername: string;
          };
        }>;
        ResultEvent: Array<{
          id: number;
          teamId: number;
          playerId: number;
          eventType: { id: number; name: string };
          player: {
            id: number;
            gamertag: string | null;
            discordUsername: string;
          } | null;
        }>;
      } | null;
    }>;
  }>;
};

export default async function Page() {
  const tournament = await prisma.tournament.findFirst({
    where: {
      id: 3,
    },
    include: {
      rounds: {
        orderBy: {
          start: "asc",
        },
        include: {
          fixtures: {
            include: {
              homeTeam: {
                select: {
                  id: true,
                  name: true,
                  badgeUrl: true,
                },
              },
              awayTeam: {
                select: {
                  id: true,
                  name: true,
                  badgeUrl: true,
                },
              },
              result: {
                include: {
                  ResultPlayerPerformance: {
                    include: {
                      player: {
                        select: {
                          id: true,
                          gamertag: true,
                          discordUsername: true,
                        },
                      },
                    },
                  },
                  ResultEvent: {
                    include: {
                      eventType: true,
                      player: {
                        select: {
                          id: true,
                          gamertag: true,
                          discordUsername: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            orderBy: {
              id: "asc",
            },
          },
        },
      },
    },
  });

  return <ScoresFixtures tournament={tournament} />;
}

const ScoresFixtures = ({
  tournament,
}: {
  tournament: TournamentWithRounds | null;
}) => {
  return (
    <>
      <h2 className="text-secondary">Scores & Fixtures</h2>
      {tournament?.rounds.map((round, index) => (
        <div className="py-2" key={round.id}>
          <div className="card">
            <div className="card-header">
              <div className="text-primary text-center">Round {index + 1} </div>
              <div className="text-secondary text-center">
                {round.start.toLocaleDateString()} -{" "}
                {round.end.toLocaleDateString()}
              </div>
            </div>
            <ul className="list-group list-group-flush" key={round.id}>
              {round.fixtures.map((fixture, index) => (
                <li
                  className="list-group-item"
                  key={index}
                  id={`fixture-${fixture.id}`}
                >
                  <div className="d-flex flex-row gap-2 align-items-center py-2">
                    <div className="flex-grow-1 text-end w-25">
                      {fixture.homeTeam.name}
                    </div>
                    <Image
                      src={
                        fixture.homeTeam.badgeUrl
                          ? fixture.homeTeam.badgeUrl
                          : "/badge.svg"
                      }
                      alt={fixture.homeTeam.name}
                      width={30}
                      height={30}
                    />
                    <div className="fs-2 fw-bold">
                      {fixture.result ? (
                        <div>
                          <div className="d-inline">
                            {fixture.result.homeTeamScore}
                          </div>
                          <div className="d-inline score-divider"></div>
                          <div className="d-inline">
                            {fixture.result.awayTeamScore}
                          </div>
                        </div>
                      ) : (
                        "vs"
                      )}
                    </div>
                    <Image
                      src={
                        fixture.awayTeam.badgeUrl
                          ? fixture.awayTeam.badgeUrl
                          : "/badge.svg"
                      }
                      alt={fixture.awayTeam.name}
                      width={30}
                      height={30}
                    />
                    <div className="flex-grow-1 w-25">
                      {fixture.awayTeam.name}
                    </div>
                  </div>
                  {fixture.result &&
                    fixture.result.ResultPlayerPerformance &&
                    fixture.result.ResultPlayerPerformance.length > 0 && (
                      <>
                        {/* Mobile HT score - only shown on small screens, above goalscorers */}
                        {fixture.result.homeTeamHalfTimeScore !== null &&
                          fixture.result.awayTeamHalfTimeScore !== null && (
                            <div className="d-lg-none text-center text-muted small py-1">
                              HT {fixture.result.homeTeamHalfTimeScore}-
                              {fixture.result.awayTeamHalfTimeScore}
                            </div>
                          )}

                        <div className="d-flex flex-row gap-2 align-items-start py-1 text-muted small">
                          <div className="flex-grow-1 text-end w-25">
                            {fixture.result.ResultPlayerPerformance.filter(
                              (performance) =>
                                performance.teamId === fixture.homeTeam.id &&
                                performance.goals &&
                                performance.goals > 0
                            )
                              .sort((a, b) => {
                                // Sort by goals (descending), then by gamertag (ascending)
                                const goalDiff =
                                  (b.goals || 0) - (a.goals || 0);
                                if (goalDiff !== 0) return goalDiff;
                                const nameA =
                                  a.player.gamertag ||
                                  a.player.discordUsername ||
                                  "Unknown";
                                const nameB =
                                  b.player.gamertag ||
                                  b.player.discordUsername ||
                                  "Unknown";
                                return nameA.localeCompare(nameB);
                              })
                              .map((performance, idx) => (
                                <div key={idx}>
                                  {performance.player.gamertag ||
                                    performance.player.discordUsername ||
                                    "Unknown"}{" "}
                                  {"⚽".repeat(performance.goals || 0)}
                                </div>
                              ))}
                          </div>
                          <div
                            className="d-none d-lg-block text-center text-muted small"
                            style={{ minWidth: "60px" }}
                          >
                            {fixture.result.homeTeamHalfTimeScore !== null &&
                              fixture.result.awayTeamHalfTimeScore !== null && (
                                <div>
                                  HT {fixture.result.homeTeamHalfTimeScore}-
                                  {fixture.result.awayTeamHalfTimeScore}
                                </div>
                              )}
                          </div>
                          <div className="flex-grow-1 w-25">
                            {fixture.result.ResultPlayerPerformance.filter(
                              (performance) =>
                                performance.teamId === fixture.awayTeam.id &&
                                performance.goals &&
                                performance.goals > 0
                            )
                              .sort((a, b) => {
                                // Sort by goals (descending), then by gamertag (ascending)
                                const goalDiff =
                                  (b.goals || 0) - (a.goals || 0);
                                if (goalDiff !== 0) return goalDiff;
                                const nameA =
                                  a.player.gamertag ||
                                  a.player.discordUsername ||
                                  "Unknown";
                                const nameB =
                                  b.player.gamertag ||
                                  b.player.discordUsername ||
                                  "Unknown";
                                return nameA.localeCompare(nameB);
                              })
                              .map((performance, idx) => (
                                <div key={idx}>
                                  {"⚽".repeat(performance.goals || 0)}{" "}
                                  {performance.player.gamertag ||
                                    performance.player.discordUsername ||
                                    "Unknown"}
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Assists section with horizontal separator */}
                        {(fixture.result.ResultPlayerPerformance.some(
                          (p) =>
                            p.teamId === fixture.homeTeam.id &&
                            p.assists &&
                            p.assists > 0
                        ) ||
                          fixture.result.ResultPlayerPerformance.some(
                            (p) =>
                              p.teamId === fixture.awayTeam.id &&
                              p.assists &&
                              p.assists > 0
                          )) && (
                          <>
                            <hr className="my-2" />

                            {/* Mobile Assists label - only shown on small screens, above assists */}
                            <div className="d-lg-none text-center small py-1">
                              Assists
                            </div>

                            <div className="d-flex flex-row gap-2 align-items-start py-1 text-muted small">
                              <div className="flex-grow-1 text-end w-25">
                                {fixture.result.ResultPlayerPerformance.filter(
                                  (performance) =>
                                    performance.teamId ===
                                      fixture.homeTeam.id &&
                                    performance.assists &&
                                    performance.assists > 0
                                )
                                  .sort((a, b) => {
                                    // Sort by assists (descending), then by gamertag (ascending)
                                    const assistDiff =
                                      (b.assists || 0) - (a.assists || 0);
                                    if (assistDiff !== 0) return assistDiff;
                                    const nameA =
                                      a.player.gamertag ||
                                      a.player.discordUsername ||
                                      "Unknown";
                                    const nameB =
                                      b.player.gamertag ||
                                      b.player.discordUsername ||
                                      "Unknown";
                                    return nameA.localeCompare(nameB);
                                  })
                                  .map((performance, idx) => (
                                    <div key={idx}>
                                      {performance.player.gamertag ||
                                        performance.player.discordUsername ||
                                        "Unknown"}{" "}
                                      {"🅰️".repeat(performance.assists || 0)}
                                    </div>
                                  ))}
                              </div>
                              <div
                                className="d-none d-lg-block text-center small"
                                style={{ minWidth: "60px" }}
                              >
                                <div>Assists</div>
                              </div>
                              <div className="flex-grow-1 w-25">
                                {fixture.result.ResultPlayerPerformance.filter(
                                  (performance) =>
                                    performance.teamId ===
                                      fixture.awayTeam.id &&
                                    performance.assists &&
                                    performance.assists > 0
                                )
                                  .sort((a, b) => {
                                    // Sort by assists (descending), then by gamertag (ascending)
                                    const assistDiff =
                                      (b.assists || 0) - (a.assists || 0);
                                    if (assistDiff !== 0) return assistDiff;
                                    const nameA =
                                      a.player.gamertag ||
                                      a.player.discordUsername ||
                                      "Unknown";
                                    const nameB =
                                      b.player.gamertag ||
                                      b.player.discordUsername ||
                                      "Unknown";
                                    return nameA.localeCompare(nameB);
                                  })
                                  .map((performance, idx) => (
                                    <div key={idx}>
                                      {"🅰️".repeat(performance.assists || 0)}{" "}
                                      {performance.player.gamertag ||
                                        performance.player.discordUsername ||
                                        "Unknown"}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Man of the Match section with horizontal separator */}
                        {fixture.result.ResultPlayerPerformance.some(
                          (p) => p.manOfTheMatch
                        ) && (
                          <>
                            <hr className="my-2" />

                            <div className="text-center small py-1">
                              Man of the Match
                            </div>

                            <div className="text-center py-1 text-muted small">
                              {fixture.result.ResultPlayerPerformance
                                .filter((performance) => performance.manOfTheMatch)
                                .map((performance, idx) => (
                                  <span key={idx}>
                                    🥇 {performance.player.gamertag ||
                                      performance.player.discordUsername ||
                                      "Unknown"} ({performance.rating?.toFixed(1)})
                                  </span>
                                ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};
