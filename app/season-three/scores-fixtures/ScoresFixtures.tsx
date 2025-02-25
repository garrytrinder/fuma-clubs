'use client';

import React from 'react';
import Image from 'next/image';

interface Tournament {
    id: number;
    name: string;
    rounds: Round[];
}

interface Round {
    id: number;
    start: Date;
    end: Date;
    fixtures: Fixture[];
}

interface Fixture {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    result: Result | null;
}

interface Team {
    id: number;
    name: string;
    badgeUrl: string | null;
}

interface Result {
    homeTeamScore: number;
    awayTeamScore: number;
    ResultPlayerPerformance: ResultPlayerPerformance[];
    ResultEvent: ResultEvent[];
}

interface ResultPlayerPerformance {
    player: Player;
    teamId: number;
    manOfTheMatch: boolean;
    rating: number;
}

interface ResultEvent {
    player: Player;
    teamId: number;
    eventType: EventType;
}

interface Player {
    gamertag: string;
}

interface EventType {
    name: string;
}

interface ScoresFixturesProps {
    tournament: Tournament | null;
}

const EventList: React.FC<{ events: ResultEvent[], teamId: number, isHomeTeam: boolean }> = ({ events, teamId, isHomeTeam }) => {
    const eventCounts = events.reduce((acc, event) => {
        const key = `${event.player.gamertag}-${event.eventType.name}-${event.teamId}`;
        if (!acc[key]) {
            acc[key] = { ...event, count: 0 };
        }
        acc[key].count += 1;
        return acc;
    }, {} as Record<string, ResultEvent & { count: number }>);

    return (
        <ul className="list-unstyled">
            {Object.values(eventCounts).map((event, index) => {
                let displayOnTeam = event.teamId === teamId;
                let icon = '';
                switch (event.eventType.name) {
                    case 'Goal':
                        icon = '⚽️';
                        break;
                    case 'Goal (penalty)':
                        icon = '⚽️ (pen)';
                        break;
                    case 'Own goal':
                        icon = '⚽️ (og)';
                        displayOnTeam = !displayOnTeam;
                        break;
                    case 'Penalty miss':
                        icon = '❌ (pen)';
                        break;
                    case 'Assist':
                        icon = '🅰️';
                        break;
                    case 'Yellow Card':
                        icon = '🟨';
                        break;
                    case 'Red Card':
                        icon = '🟥';
                        break;
                    default:
                        break;
                }
                if (displayOnTeam) {
                    const icons = icon.repeat(event.count);
                    return <li key={`${event.player.gamertag}-${index}`}>{isHomeTeam ? event.player.gamertag + ' ' + icons : icons + ' ' + event.player.gamertag}</li>;
                }
                return null;
            })}
        </ul>
    );
};

const PerformanceList: React.FC<{ performances: ResultPlayerPerformance[], teamId: number, isHomeTeam: boolean }> = ({ performances, teamId, isHomeTeam }) => {
    return (
        <ul className="list-unstyled">
            {performances.map((performance, index) => {
                if (performance.teamId === teamId && performance.manOfTheMatch) {
                    return (
                        <li key={`${performance.player.gamertag}-${index}`}>
                            {isHomeTeam ? (
                                <>
                                    {performance.player.gamertag}{performance.rating !== 0 ? ` (${performance.rating})` : null} 🥇
                                </>
                            ) : (
                                <>
                                    🥇 {performance.player.gamertag}{performance.rating !== 0 ? ` (${performance.rating})` : null}
                                </>
                            )}
                        </li>
                    );
                }
                return null;
            })}
        </ul>
    );
};

const ScoresFixtures: React.FC<ScoresFixturesProps> = ({ tournament }) => {

    const [showScorers, setShowScorers] = React.useState(false);

    return (
        <>
            <h1 className="text-primary">{tournament?.name}</h1>
            <h2 className="text-secondary">Scores and fixtures</h2>
            {/* <div className="text-end">
                <button className="btn btn-primary" onClick={() => setShowScorers(!showScorers)}>
                    {showScorers ? 'Hide scorers' : 'Show scorers'}
                </button>
            </div> */}

            {tournament?.rounds.map((round, index) => (
                <div className="py-2" key={round.id}>
                    <div className="card">
                        <div className="card-header">
                            <div className="text-primary text-center">Round {index + 1} </div>
                            <div className="text-secondary text-center">{round.start.toLocaleDateString()} - {round.end.toLocaleDateString()}</div>
                        </div>
                        <ul className="list-group list-group-flush" key={round.id}>
                            {round.fixtures.map((fixture, index) =>
                                <li className="list-group-item" key={index} id={`fixture-${fixture.id}`}>
                                    <div className="d-flex flex-row gap-2 align-items-center py-2">
                                        <div className="flex-grow-1 text-end w-25">
                                            {fixture.homeTeam.name}
                                        </div>
                                        <Image src={fixture.homeTeam.badgeUrl ? fixture.homeTeam.badgeUrl : '/badge.svg'} alt={fixture.homeTeam.name} width={30} height={30} />
                                        <div className="fs-5 fw-bold">
                                            {fixture.result ? <div>
                                                <div className="d-inline">
                                                    {fixture.result.homeTeamScore}
                                                </div>
                                                <div className="d-inline score-divider">
                                                </div>
                                                <div className="d-inline">
                                                    {fixture.result.awayTeamScore}
                                                </div>
                                            </div> : 'vs'
                                            }
                                        </div>
                                        <Image src={fixture.awayTeam.badgeUrl ? fixture.awayTeam.badgeUrl : '/badge.svg'} alt={fixture.awayTeam.name} width={30} height={30} />
                                        <div className="flex-grow-1 w-25">
                                            {fixture.awayTeam.name}
                                        </div>
                                    </div>
                                    {showScorers && fixture.result &&
                                        <div className="row grid gap-0 fw-medium">
                                            <div className="col p-0 pe-1 text-end">
                                                <EventList events={fixture.result.ResultEvent} teamId={fixture.homeTeam.id} isHomeTeam={true} />
                                                <PerformanceList performances={fixture.result.ResultPlayerPerformance} teamId={fixture.homeTeam.id} isHomeTeam={true} />
                                            </div>
                                            <div className="col p-0 ps-1 text-start">
                                                <EventList events={fixture.result.ResultEvent} teamId={fixture.awayTeam.id} isHomeTeam={false} />
                                                <PerformanceList performances={fixture.result.ResultPlayerPerformance} teamId={fixture.awayTeam.id} isHomeTeam={false} />
                                            </div>
                                        </div>
                                    }
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ScoresFixtures;
