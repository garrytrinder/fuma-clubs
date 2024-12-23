import { prisma } from "@/app/lib/prisma";
import { string } from "zod";

export const dynamic = 'force-dynamic';

export default async function SeasonTwoScoresFixturesPage() {

    const tournament = await prisma.tournament.findUnique({
        where: {
            id: 1
        },
        include: {
            rounds: {
                orderBy: {
                    start: 'asc'
                },
                include: {
                    fixtures: {
                        include: {
                            homeTeam: true,
                            awayTeam: true,
                            result: {
                                include: {
                                    ResultPlayerPerformance: {
                                        include: {
                                            player: true
                                        }
                                    },
                                    ResultEvent: {
                                        include: {
                                            player: true,
                                            eventType: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: {
                            id: 'asc'
                        }
                    }
                }
            }
        },
    });

    return <>
        <h1 className="text-primary">{tournament?.name}</h1>
        <h2 className="text-secondary">Scores and fixtures</h2>

        {tournament?.rounds.map((round, index) => (
            <div className="py-2" key={round.id}>
                <h3 className="text-primary text-center">Round {index + 1}</h3>
                <p className="text-secondary text-center">({round.start.toLocaleDateString()} - {round.end.toLocaleDateString()})</p>
                <ul className="list-group" key={round.id}>
                    {round.fixtures.map((fixture, index) =>
                        <li className="list-group-item" key={index}>
                            <div className="fluid-container">
                                <div className="row py-2">
                                    <div className="col p-0 text-end">
                                        {fixture.homeTeam.name}
                                    </div>
                                    <div className="col-2 p-0 text-center">
                                        {fixture.result ? `${fixture.result.homeTeamScore} - ${fixture.result.awayTeamScore}` : 'vs'}
                                    </div>
                                    <div className="col p-0 text-start">
                                        {fixture.awayTeam.name}
                                    </div>
                                </div>
                            </div>
                            <div className="fluid-container">
                                <div className="row">
                                    <div className="col p-0 text-end">
                                        <ul className="list-unstyled">
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Goal' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-goal=${index}`}>{event.player.gamertag} ⚽️</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Goal (penalty)' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-pen=${index}`}>{event.player.gamertag} (pen) ⚽️</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Own goal' && event.teamId === fixture.awayTeam.id) {
                                                    return <li key={`${fixture.id}-pen-miss=${index}`}>{event.player.gamertag} (og) ⚽️</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Penalty miss' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-pen-miss=${index}`}>{event.player.gamertag} (pen) ❌</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Assist' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-assist=${index}`}>{event.player.gamertag} 🅰️</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Yellow Card' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-yellow=${index}`}>{event.player.gamertag} 🟨</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Red Card' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-red=${index}`}>{event.player.gamertag} 🟥</li>
                                                }
                                            })}
                                            {fixture.result?.ResultPlayerPerformance.map((performance, index) => {
                                                if (performance.teamId === fixture.homeTeam.id && performance.manOfTheMatch) {
                                                    return <li key={`${fixture.id}-mom-${index}`}>{performance.player.gamertag}{performance.rating !== 0 ? ` (${performance.rating})` : null} 🥇</li>
                                                }
                                            })}
                                        </ul>
                                    </div>
                                    <div className="col-2 p-0 text-center">
                                    </div>
                                    <div className="col p-0 text-start">
                                        <ul className="list-unstyled">
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Goal' && event.teamId === fixture.awayTeam.id) {
                                                    return <li key={`${fixture.id}-goal=${index}`}>⚽️ {event.player.gamertag}</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Goal (penalty)' && event.teamId === fixture.awayTeam.id) {
                                                    return <li key={`${fixture.id}-goal=${index}`}>⚽️ {event.player.gamertag} (pen)</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Own goal' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-pen-miss=${index}`}>{event.player.gamertag} (og) ⚽️</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Penalty miss' && event.teamId === fixture.homeTeam.id) {
                                                    return <li key={`${fixture.id}-pen-miss=${index}`}>❌ {event.player.gamertag} (pen)</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Assist' && event.teamId === fixture.awayTeam.id) {
                                                    return <li key={`${fixture.id}-assist=${index}`}>🅰️ {event.player.gamertag}</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Yellow Card' && event.teamId === fixture.awayTeam.id) {
                                                    return <li key={`${fixture.id}-yellow=${index}`}>🟨 {event.player.gamertag}</li>
                                                }
                                            })}
                                            {fixture.result?.ResultEvent.map((event, index, array) => {
                                                if (event.eventType.name === 'Red Card' && event.teamId === fixture.awayTeam.id) {
                                                    return <li key={`${fixture.id}-red=${index}`}>🟥 {event.player.gamertag}</li>
                                                }
                                            })}
                                            {fixture.result?.ResultPlayerPerformance.map((performance, index) => {
                                                if (performance.teamId === fixture.awayTeam.id && performance.manOfTheMatch) {
                                                    return <li key={`${fixture.id}-mom-${index}`}>🥇 {performance.player.gamertag} {performance.rating !== 0 ? `(${performance.rating})` : null}</li>
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        ))}
    </>
}