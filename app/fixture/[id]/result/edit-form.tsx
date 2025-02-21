"use client";

import { Player, Team } from "@prisma/client";
import { useState } from "react";

interface PlayerPerformance {
    playerId: number;
    teamId: number;
    rating: number;
    goals: number;
    assists: number;
    ownGoals: number;
}

export const ResultEditForm = (
    { resultId, homeTeam, awayTeam, players }:
        { resultId: string, homeTeam: Team, awayTeam: Team, players: Player[] }) => {

    const [playerPerformances, setPlayerPerformances] = useState<PlayerPerformance[]>([]);

    const [playerPerformanceForm, setPlayerPerformanceForm] = useState({
        playerId: 0,
        teamId: 0,
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

    const homeScore = totalHomeGoals + totalAwayOwnGoals;
    const awayScore = totalAwayGoals + totalHomeOwnGoals;

    const motm = playerPerformances.sort((a, b) => b.rating - a.rating)[0];

    function handleSubmit() {

        setPlayerPerformances([...playerPerformances, {
            playerId: playerPerformanceForm.playerId,
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

    const isFormValid = !playerPerformanceForm.playerId
        || !playerPerformanceForm.teamId
        || !playerPerformanceForm.rating.game1
        || !playerPerformanceForm.rating.game2;

    return (
        <>
            <h1 className="text-primary">{homeTeam.name} {homeScore} | {awayScore} {awayTeam.name}</h1>
            <h2 className="text-secondary">Match stats</h2>
            <div className="mb-3">
                <div className="input-group">
                    <input type="number" className="form-control" min={0} />
                    <span className="input-group-text">Shots</span>
                    <input type="number" className="form-control" min={0} />
                </div>
            </div>
            <div className="mb-3">
                <div className="input-group">
                    <input type="number" className="form-control" min={0} />
                    <span className="input-group-text">Possesion</span>
                    <input type="number" className="form-control" min={0} />
                </div>
            </div>
            <h2 className="text-secondary">Player performance</h2>
            <div className="mb-3">
                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={`${playerPerformanceForm.playerId}-${playerPerformanceForm.teamId}`} onChange={(e) => setPlayerPerformanceForm({ ...playerPerformanceForm, playerId: Number(e.target.value.split("-")[0]), teamId: Number(e.target.value.split("-")[1]) })}>
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
                    <label htmlFor="floatingSelect">Name</label>
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
            <h3 className="text-secondary">{homeTeam.name}</h3>
            <div className="mb-3">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
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
            <h3 className="text-secondary">{awayTeam.name}</h3>
            <div className="mb-3">
                <table className="table table-sm">
                    <thead>
                        <tr>
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
            <h2 className="text-secondary">Man of the Match</h2>
            {motm &&
                <div className="mb-3">
                    {players.find(p => p.id === motm.playerId)?.kitName} {motm.rating}
                </div>
            }
        </>
    )
}