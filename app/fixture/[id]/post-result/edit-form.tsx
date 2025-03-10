"use client";

import { SubmitButton } from "@/app/club/player/[id]/edit/edit-form";
import { createResult } from "@/app/lib/actions";
import { Formation, Player, Position, Team } from "@prisma/client";
import Form from "next/form";
import { startTransition, useActionState, useState } from "react";

export interface PlayerPerformance {
    playerId: number;
    positionId: number;
    teamId: number;
    rating: number;
    goals: number;
    assists: number;
    ownGoals: number;
}

export const ResultCreateForm = (
    { fixtureId, homeTeam, awayTeam, players, positions, formations }:
        { fixtureId: number, homeTeam: Team, awayTeam: Team, players: Player[], positions: Position[], formations: Formation[] }) => {

    const [recordings, setRecordings] = useState({
        home:
        {
            game1: "",
            game2: ""
        },
        away: {
            game1: "",
            game2: ""
        }
    });

    const [playerPerformances, setPlayerPerformances] = useState<PlayerPerformance[]>([]);
    const [playerPerformanceForm, setPlayerPerformanceForm] = useState({
        playerId: 0,
        teamId: 0,
        positionId: 0,
        rating: {
            game1: 0,
            game2: 0
        },
        goals: {
            game1: 0,
            game2: 0
        },
        assists: {
            game1: 0,
            game2: 0
        },
        ownGoals: {
            game1: 0,
            game2: 0
        }
    });

    const totalRating = !playerPerformanceForm.rating.game2
        ? playerPerformanceForm.rating.game1.toFixed(1)
        : ((playerPerformanceForm.rating.game1 + playerPerformanceForm.rating.game2) / 2).toFixed(1);
    const totalGoals = playerPerformanceForm.goals.game1 + playerPerformanceForm.goals.game2;
    const totalAssists = playerPerformanceForm.assists.game1 + playerPerformanceForm.assists.game2;
    const totalOwnGoals = playerPerformanceForm.ownGoals.game1 + playerPerformanceForm.ownGoals.game2;

    const totalHomeGoals = playerPerformances.filter(playerPerformance => playerPerformance.teamId === homeTeam.id).reduce((acc, playerPerformance) => acc + playerPerformance.goals, 0);
    const totalHomeOwnGoals = playerPerformances.filter(playerPerformance => playerPerformance.teamId === homeTeam.id).reduce((acc, playerPerformance) => acc + playerPerformance.ownGoals, 0);
    const totalAwayGoals = playerPerformances.filter(playerPerformance => playerPerformance.teamId === awayTeam.id).reduce((acc, playerPerformance) => acc + playerPerformance.goals, 0);
    const totalAwayOwnGoals = playerPerformances.filter(playerPerformance => playerPerformance.teamId === awayTeam.id).reduce((acc, playerPerformance) => acc + playerPerformance.ownGoals, 0);

    const halfTimeHomeGoals = playerPerformances
        .filter(playerPerformance => playerPerformance.teamId === homeTeam.id)
        .reduce((acc, playerPerformance) => acc + playerPerformance.goals, 0)
        + playerPerformances
            .filter(playerPerformance => playerPerformance.teamId === awayTeam.id)
            .reduce((acc, playerPerformance) => acc + playerPerformance.ownGoals, 0);

    const halfTimeAwayGoals = playerPerformances
        .filter(playerPerformance => playerPerformance.teamId === awayTeam.id)
        .reduce((acc, playerPerformance) => acc + playerPerformance.goals, 0)
        + playerPerformances
            .filter(playerPerformance => playerPerformance.teamId === homeTeam.id)
            .reduce((acc, playerPerformance) => acc + playerPerformance.ownGoals, 0);

    const homeScore = totalHomeGoals + totalAwayOwnGoals;
    const awayScore = totalAwayGoals + totalHomeOwnGoals;

    const [matchStats, setMatchStats] = useState({
        homeTeamFormationId: 0,
        awayTeamFormationId: 0,
        homeShots: {
            game1: 0,
            game2: 0
        },
        awayShots: {
            game1: 0,
            game2: 0
        },
        homePossession: {
            game1: 0,
            game2: 0
        },
        awayPossession: {
            game1: 0,
            game2: 0
        },
        homePasses: {
            game1: 0,
            game2: 0
        },
        awayPasses: {
            game1: 0,
            game2: 0
        },
        homePassAccuracy: {
            game1: 0,
            game2: 0
        },
        awayPassAccuracy: {
            game1: 0,
            game2: 0
        },
        homeTackles: {
            game1: 0,
            game2: 0
        },
        awayTackles: {
            game1: 0,
            game2: 0
        },
        homeXG: {
            game1: 0,
            game2: 0
        },
        awayXG: {
            game1: 0,
            game2: 0
        },
        homeSaves: {
            game1: 0,
            game2: 0
        },
        awaySaves: {
            game1: 0,
            game2: 0
        }
    });

    const totalHomeShots = matchStats.homeShots.game1 + matchStats.homeShots.game2;
    const totalAwayShots = matchStats.awayShots.game1 + matchStats.awayShots.game2;

    const roundPossession = (home: number, away: number): [number, number] => {
        const total = home + away;
        if (total === 0) {
            return [0, 0];
        }
        const homeRounded = Math.round((home / total) * 100);
        const awayRounded = 100 - homeRounded;
        return [homeRounded, awayRounded];
    };

    const [totalHomePossession, totalAwayPossession] = roundPossession(
        (matchStats.homePossession.game1 + matchStats.homePossession.game2) / 2,
        (matchStats.awayPossession.game1 + matchStats.awayPossession.game2) / 2
    );

    const totalHomePasses = matchStats.homePasses.game1 + matchStats.homePasses.game2;
    const totalAwayPasses = matchStats.awayPasses.game1 + matchStats.awayPasses.game2;

    const totalHomePassAccuracy = ((matchStats.homePassAccuracy.game1 + matchStats.homePassAccuracy.game2) / 2).toFixed(0);
    const totalAwayPassAccuracy = ((matchStats.awayPassAccuracy.game1 + matchStats.awayPassAccuracy.game2) / 2).toFixed(0);

    const totalHomeTackles = matchStats.homeTackles.game1 + matchStats.homeTackles.game2;
    const totalAwayTackles = matchStats.awayTackles.game1 + matchStats.awayTackles.game2;

    const totalHomeXG = (matchStats.homeXG.game1 + matchStats.homeXG.game2).toFixed(1);
    const totalAwayXG = (matchStats.awayXG.game1 + matchStats.awayXG.game2).toFixed(1);

    const totalHomeSaves = matchStats.homeSaves.game1 + matchStats.homeSaves.game2;
    const totalAwaySaves = matchStats.awaySaves.game1 + matchStats.awaySaves.game2;

    playerPerformances.sort((a, b) => b.rating - a.rating);
    const highestRatedPlayer = playerPerformances[0];
    const motm = playerPerformances.filter(playerPerformance => playerPerformance.rating === highestRatedPlayer.rating);

    // calculate the average rating for the team, this is the average rating for all players in the team
    const homeTeamPerformances = playerPerformances.filter(playerPerformance => playerPerformance.teamId === homeTeam.id);
    const awayTeamPerformances = playerPerformances.filter(playerPerformance => playerPerformance.teamId === awayTeam.id);
    const homeTeamRating = homeTeamPerformances.length > 0 ? homeTeamPerformances.reduce((acc, playerPerformance) => acc + playerPerformance.rating, 0) / homeTeamPerformances.length : 0;
    const awayTeamRating = awayTeamPerformances.length > 0 ? awayTeamPerformances.reduce((acc, playerPerformance) => acc + playerPerformance.rating, 0) / awayTeamPerformances.length : 0;

    const createResultForFixture = createResult.bind(null, fixtureId);
    const [state, formAction] = useActionState(createResultForFixture, null);

    function handleSubmit() {

        setPlayerPerformances([...playerPerformances, {
            playerId: playerPerformanceForm.playerId,
            positionId: playerPerformanceForm.positionId,
            teamId: playerPerformanceForm.teamId,
            rating: Number(totalRating),
            goals: totalGoals,
            assists: totalAssists,
            ownGoals: totalOwnGoals
        }]);

        // reset form
        setPlayerPerformanceForm({
            ...playerPerformanceForm,
            playerId: 0,
            teamId: 0,
            positionId: 0,
            rating: {
                game1: 0,
                game2: 0
            },
            goals: {
                game1: 0,
                game2: 0
            },
            assists: {
                game1: 0,
                game2: 0
            },
            ownGoals: {
                game1: 0,
                game2: 0
            }
        });
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("recordingHomeGame1", recordings.home.game1);
        formData.append("recordingHomeGame2", recordings.home.game2);
        formData.append("recordingAwayGame1", recordings.away.game1);
        formData.append("recordingAwayGame2", recordings.away.game2);
        formData.append("homeTeamId", String(homeTeam.id));
        formData.append("awayTeamId", String(awayTeam.id));
        formData.append("homeTeamFormationId", String(matchStats.homeTeamFormationId));
        formData.append("awayTeamFormationId", String(matchStats.awayTeamFormationId));
        formData.append("homeScore", String(homeScore));
        formData.append("awayScore", String(awayScore));
        formData.append("homeTeamRating", String(homeTeamRating));
        formData.append("awayTeamRating", String(awayTeamRating));
        formData.append("halfTimeHomeGoals", String(halfTimeHomeGoals));
        formData.append("halfTimeAwayGoals", String(halfTimeAwayGoals));
        formData.append("homeShots", String(totalHomeShots));
        formData.append("awayShots", String(totalAwayShots));
        formData.append("homePossession", String(totalHomePossession));
        formData.append("awayPossession", String(totalAwayPossession));
        formData.append("homePasses", String(totalHomePasses));
        formData.append("awayPasses", String(totalAwayPasses));
        formData.append("homePassAccuracy", totalHomePassAccuracy);
        formData.append("awayPassAccuracy", totalAwayPassAccuracy);
        formData.append("homeTackles", String(totalHomeTackles));
        formData.append("awayTackles", String(totalAwayTackles));
        formData.append("homeXG", totalHomeXG);
        formData.append("awayXG", totalAwayXG);
        formData.append("homeSaves", String(totalHomeSaves));
        formData.append("awaySaves", String(totalAwaySaves));
        formData.append("playerPerformances", JSON.stringify(playerPerformances));
        formData.append("motm", JSON.stringify(motm));

        const goalkeepers = playerPerformances.filter(x => {
            if (x.positionId === 1) {
                if (x.teamId === homeTeam.id && awayScore === 0) {
                    return x;
                }
                if (x.teamId === awayTeam.id && homeScore === 0) {
                    return x;
                }
            }
        });

        formData.append("gkCleanSheets", JSON.stringify(goalkeepers));

        startTransition(() => {
            formAction(formData);
        });
    }

    const isFormValid = !playerPerformanceForm.playerId
        || !playerPerformanceForm.teamId
        || !playerPerformanceForm.rating.game1
        || !playerPerformanceForm.rating.game2;

    return (
        <>
            <div className="d-flex flex-row fs-1 justify-content-between">
                <div>{homeTeam.name} </div>
                <div>{homeScore}</div>
                <div>{awayScore}</div>
                <div>{awayTeam.name}</div>
            </div>
            <div className="d-flex flex-row fs-3 justify-content-between">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" readOnly value={halfTimeHomeGoals} />
                    <span className="input-group-text">Half time</span>
                    <input type="text" className="form-control" readOnly value={halfTimeAwayGoals} />
                </div>
            </div>
            <div className="d-flex flex-row fs-3 justify-content-between">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" readOnly value={homeTeamRating.toFixed(1) || 0.0} />
                    <span className="input-group-text">Rating</span>
                    <input type="text" className="form-control" readOnly value={awayTeamRating.toFixed(1) || 0.0} />
                </div>
            </div>
            <h2 className="text-secondary">Match recordings</h2>
            <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={(e) => setRecordings({ ...recordings, home: { ...recordings.home, game1: e.target.value } })} />
                <span className="input-group-text">Game 1</span>
                <input type="text" className="form-control" onChange={(e) => setRecordings({ ...recordings, away: { ...recordings.away, game1: e.target.value } })} />
            </div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={(e) => setRecordings({ ...recordings, home: { ...recordings.home, game2: e.target.value } })} />
                <span className="input-group-text">Game 2</span>
                <input type="text" className="form-control" onChange={(e) => setRecordings({ ...recordings, away: { ...recordings.away, game2: e.target.value } })} />
            </div>
            <h2 className="text-secondary">Match stats</h2>
            <div className="mb-3">
                <div className="input-group">
                    <select className="form-select" onChange={(e) => setMatchStats({ ...matchStats, homeTeamFormationId: Number(e.target.value) })}>
                        <option value="0"></option>
                        {
                            formations.map((formation, index) => {
                                return <option key={`home-formation-${index}`} value={formation.id}>{formation.name}</option>
                            })
                        }
                    </select>
                    <span className="input-group-text">Formation</span>
                    <select className="form-select" onChange={(e) => setMatchStats({ ...matchStats, awayTeamFormationId: Number(e.target.value) })}>
                        <option value="0"></option>
                        {
                            formations.map((formation, index) => {
                                return <option key={`away-formation-${index}`} value={formation.id}>{formation.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomePossession}</span>
                <input type="number" className="form-control" min={0} max={100} onChange={(e) => setMatchStats({ ...matchStats, homePossession: { ...matchStats.homePossession, game1: Number(e.target.value) }, awayPossession: { ...matchStats.awayPossession, game1: 100 - Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} max={100} onChange={(e) => setMatchStats({ ...matchStats, homePossession: { ...matchStats.homePossession, game2: Number(e.target.value) }, awayPossession: { ...matchStats.awayPossession, game2: 100 - Number(e.target.value) } })} />
                <span className="input-group-text">Possession</span>
                <input type="number" className="form-control" disabled={true} min={0} max={100} value={matchStats.awayPossession.game1} onChange={(e) => setMatchStats({ ...matchStats, awayPossession: { ...matchStats.awayPossession, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" disabled={true} min={0} max={100} value={matchStats.awayPossession.game2} onChange={(e) => setMatchStats({ ...matchStats, awayPossession: { ...matchStats.awayPossession, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwayPossession}</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomeShots}</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homeShots: { ...matchStats.homeShots, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homeShots: { ...matchStats.homeShots, game2: Number(e.target.value) } })} />
                <span className="input-group-text">Shots</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awayShots: { ...matchStats.awayShots, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awayShots: { ...matchStats.awayShots, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwayShots}</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomeXG}</span>
                <input type="number" className="form-control" min={0} step={0.1} onChange={(e) => setMatchStats({ ...matchStats, homeXG: { ...matchStats.homeXG, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} step={0.1} onChange={(e) => setMatchStats({ ...matchStats, homeXG: { ...matchStats.homeXG, game2: Number(e.target.value) } })} />
                <span className="input-group-text">Expected Goals (XG)</span>
                <input type="number" className="form-control" min={0} step={0.1} onChange={(e) => setMatchStats({ ...matchStats, awayXG: { ...matchStats.awayXG, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} step={0.1} onChange={(e) => setMatchStats({ ...matchStats, awayXG: { ...matchStats.awayXG, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwayXG}</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomePasses}</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homePasses: { ...matchStats.homePasses, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homePasses: { ...matchStats.homePasses, game2: Number(e.target.value) } })} />
                <span className="input-group-text">Passes</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awayPasses: { ...matchStats.awayPasses, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awayPasses: { ...matchStats.awayPasses, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwayPasses}</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomePassAccuracy}</span>
                <input type="number" className="form-control" min={0} max={100} onChange={(e) => setMatchStats({ ...matchStats, homePassAccuracy: { ...matchStats.homePassAccuracy, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} max={100} onChange={(e) => setMatchStats({ ...matchStats, homePassAccuracy: { ...matchStats.homePassAccuracy, game2: Number(e.target.value) } })} />
                <span className="input-group-text">Pass Accuracy</span>
                <input type="number" className="form-control" min={0} max={100} onChange={(e) => setMatchStats({ ...matchStats, awayPassAccuracy: { ...matchStats.awayPassAccuracy, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} max={100} onChange={(e) => setMatchStats({ ...matchStats, awayPassAccuracy: { ...matchStats.awayPassAccuracy, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwayPassAccuracy}</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomeTackles}</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homeTackles: { ...matchStats.homeTackles, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homeTackles: { ...matchStats.homeTackles, game2: Number(e.target.value) } })} />
                <span className="input-group-text">Tackles</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awayTackles: { ...matchStats.awayTackles, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awayTackles: { ...matchStats.awayTackles, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwayTackles}</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">{totalHomeSaves}</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homeSaves: { ...matchStats.homeSaves, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, homeSaves: { ...matchStats.homeSaves, game2: Number(e.target.value) } })} />
                <span className="input-group-text">Saves</span>
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awaySaves: { ...matchStats.awaySaves, game1: Number(e.target.value) } })} />
                <input type="number" className="form-control" min={0} onChange={(e) => setMatchStats({ ...matchStats, awaySaves: { ...matchStats.awaySaves, game2: Number(e.target.value) } })} />
                <span className="input-group-text">{totalAwaySaves}</span>
            </div>
            <h2 className="text-secondary">Player performance</h2>
            <div className="mb-3">
                <div className="form-floating">
                    <select className="form-select" id="playerId" aria-label="Player" value={`${playerPerformanceForm.playerId}-${playerPerformanceForm.teamId}`} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, playerId: Number(e.target.value.split("-")[0]), teamId: Number(e.target.value.split("-")[1]) })}>
                        <option value="0"></option>
                        <optgroup label={homeTeam.name}>
                            {players.filter(player => player.teamId === homeTeam.id).map((player, index) => {
                                if (playerPerformances.find(playerPerformance => playerPerformance.playerId === player.id)) return null;
                                return <option key={`home-${index}`} value={`${player.id}-${player.teamId}`}>{player.kitName ? player.kitName : player.discordUsername}</option>
                            })}
                        </optgroup>
                        <optgroup label={awayTeam.name}>
                            {players.filter(player => player.teamId === awayTeam.id).map((player, index) => {
                                if (playerPerformances.find(playerPerformance => playerPerformance.playerId === player.id)) return null;
                                return <option key={`away-${index}`} value={`${player.id}-${player.teamId}`}>{player.kitName ? player.kitName : player.discordUsername}</option>
                            })}
                        </optgroup>
                    </select>
                    <label htmlFor="playerId">Name</label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-floating">
                    <select className="form-select" id="positionId" aria-label="Position" value={playerPerformanceForm.positionId} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, positionId: Number(e.target.value) })}>
                        <option value="0"></option>
                        {positions.map((position, index) => {
                            return <option key={`position-${index}`} value={position.id}>{position.shortName} ({position.name})</option>
                        })}
                    </select>
                    <label htmlFor="positionId">Position</label>
                </div>
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">Rating</span>
                    <select className="form-select" value={playerPerformanceForm.rating.game1} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, rating: { ...playerPerformanceForm.rating, game1: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 61 }, (_, i) => (4 + i * 0.1).toFixed(1)).map((rating, index) => {
                                return <option key={`rating-${index}`}>{rating}</option>
                            })
                        }
                    </select>
                    <select className="form-select" value={playerPerformanceForm.rating.game2} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, rating: { ...playerPerformanceForm.rating, game2: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 61 }, (_, i) => (4 + i * 0.1).toFixed(1)).map((rating, index) => {
                                return <option key={`rating-${index}`}>{rating}</option>
                            })
                        }
                    </select>
                    <span className="input-group-text">{totalRating}</span>
                </div>
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">Goals</span>
                    <select className="form-select" value={playerPerformanceForm.goals.game1} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, goals: { ...playerPerformanceForm.goals, game1: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map((goal, index) => {
                                return <option key={`goal-${index}`}>{goal}</option>
                            })
                        }
                    </select>
                    <select className="form-select" value={playerPerformanceForm.goals.game2} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, goals: { ...playerPerformanceForm.goals, game2: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map((goal, index) => {
                                return <option key={`goal-${index}`}>{goal}</option>
                            })
                        }
                    </select>
                    <span className="input-group-text">{totalGoals}</span>
                </div>
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">Assists</span>
                    <select className="form-select" value={playerPerformanceForm.assists.game1} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, assists: { ...playerPerformanceForm.assists, game1: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map((assist, index) => {
                                return <option key={`assist-${index}`}>{assist}</option>
                            })
                        }
                    </select>
                    <select className="form-select" value={playerPerformanceForm.assists.game2} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, assists: { ...playerPerformanceForm.assists, game2: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map((assist, index) => {
                                return <option key={`assist-${index}`}>{assist}</option>
                            })
                        }
                    </select>
                    <span className="input-group-text">{totalAssists}</span>
                </div>
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">Own goals</span>
                    <select className="form-select" value={playerPerformanceForm.ownGoals.game1} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, ownGoals: { ...playerPerformanceForm.ownGoals, game1: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map((goal, index) => {
                                return <option key={`og-${index}`}>{goal}</option>
                            })
                        }
                    </select>
                    <select className="form-select" value={playerPerformanceForm.ownGoals.game2} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, ownGoals: { ...playerPerformanceForm.ownGoals, game2: Number(e.target.value) } })}>
                        <option value="0"></option>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map((goal, index) => {
                                return <option key={`og-${index}`}>{goal}</option>
                            })
                        }
                    </select>
                    <span className="input-group-text">{totalOwnGoals}</span>
                </div>
            </div>
            <div className="mb-3 text-end">
                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isFormValid}>Add</button>
            </div>
            <div className="d-flex flex-row gap-1">
                <div className="flex-grow-1">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Pos</th>
                                <th scope="col">Name</th>
                                <th scope="col">MR</th>
                                <th scope="col">G</th>
                                <th scope="col">A</th>
                                <th scope="col">OG</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerPerformances.filter(playerPerformance => playerPerformance.teamId === homeTeam.id).map((playerPerformance, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{positions.find(p => p.id === playerPerformance.positionId)?.shortName}</td>
                                        <td>{players.find(p => p.id === playerPerformance.playerId)?.kitName}</td>
                                        <td>{playerPerformance.rating}</td>
                                        <td>{playerPerformance.goals}</td>
                                        <td>{playerPerformance.assists}</td>
                                        <td>{playerPerformance.ownGoals}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => {
                                                setPlayerPerformances(playerPerformances.filter(playerPerformance => playerPerformance.playerId !== playerPerformance.playerId));
                                            }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex-grow-1">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Pos</th>
                                <th scope="col">Name</th>
                                <th scope="col">MR</th>
                                <th scope="col">G</th>
                                <th scope="col">A</th>
                                <th scope="col">OG</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerPerformances.filter(playerPerformance => playerPerformance.teamId === awayTeam.id).map((playerPerformance, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{positions.find(p => p.id === playerPerformance.positionId)?.shortName}</td>
                                        <td>{players.find(p => p.id === playerPerformance.playerId)?.kitName}</td>
                                        <td>{playerPerformance.rating}</td>
                                        <td>{playerPerformance.goals}</td>
                                        <td>{playerPerformance.assists}</td>
                                        <td>{playerPerformance.ownGoals}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => {
                                                setPlayerPerformances(playerPerformances.filter(playerPerformance => playerPerformance.playerId !== playerPerformance.playerId));
                                            }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 className="text-secondary">Man of the Match</h2>
            {motm &&
                <div className="mb-3">
                    {motm.map((motm, index) => {
                        return (
                            <div key={index}>
                                {players.find(p => p.id === motm.playerId)?.kitName} {motm.rating}
                            </div>
                        )
                    })}
                </div>
            }
            <div className="mb-3">
                <Form onSubmit={handleFormSubmit} action={formAction}>
                    <SubmitButton />
                </Form>
                {
                    state?.message && <div className="alert">{state.message}</div>
                }
            </div>
        </>
    )
}