"use client"

import { useState } from "react";

export const PlayerStats = ({ topScorers, topAssists, topPlayers }: { topScorers: any, topAssists: any, topPlayers: any }) => {

    const [activeTab, setActiveTab] = useState('topScorers');

    return <>
        <h1 className="text-primary">Season Two</h1>
        <h2 className="text-secondary">Player stats</h2>
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'topScorers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topScorers')}
                    >
                        ⚽️ Scorers
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'topAssists' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topAssists')}
                    >
                        🅰️ Assists
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'topPlayers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topPlayers')}
                    >
                        🥇 Top Rated
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === 'topScorers' && (
                    <div className="tab-pane active">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-secondary">Pos</th>
                                    <th className="text-secondary">Name</th>
                                    <th className="text-secondary">Team</th>
                                    <th className="text-secondary text-center">Goals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topScorers.map((player: any, index: number, array: any) => {
                                    const position = index > 0 && player.goals === array[index - 1].goals ? array[index - 1].position : index + 1;
                                    player.position = position;
                                    return (
                                        <tr key={index}>
                                            <td>{position}</td>
                                            <td>{player.gamertag}</td>
                                            <td>{player.team}</td>
                                            <td className="text-center">{player.goals}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'topAssists' && (
                    <div className="tab-pane active">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-secondary">Pos</th>
                                    <th className="text-secondary">Name</th>
                                    <th className="text-secondary">Team</th>
                                    <th className="text-secondary text-center">Assists</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topAssists.map((player: any, index: number, array: any) => {
                                    const position = index > 0 && player.assists === array[index - 1].assists ? array[index - 1].position : index + 1;
                                    player.position = position;
                                    return (
                                        <tr key={index}>
                                            <td>{position}</td>
                                            <td>{player.gamertag}</td>
                                            <td>{player.team}</td>
                                            <td className="text-center">{player.assists}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'topPlayers' && (
                    <div className="tab-pane active">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-secondary">Pos</th>
                                    <th className="text-secondary">Name</th>
                                    <th className="text-secondary">Team</th>
                                    <th className="text-secondary text-center">Awards</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topPlayers.map((player: any, index: number, array: any) => {
                                    const position = index > 0 && player.awards === array[index - 1].awards ? array[index - 1].position : index + 1;
                                    player.position = position;
                                    return (
                                        <tr key={index}>
                                            <td>{position}</td>
                                            <td>{player.gamertag}</td>
                                            <td>{player.team}</td>
                                            <td className="text-center">{player.awards}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    </>
};