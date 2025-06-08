'use client';

import Image from 'next/image';

interface TableData {
    name: string;
    badgeUrl: string | null;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
};

export const TournamentTable = ({ tableData }: { tableData: TableData[] }) => {
    return (
        <table className="table table-sm">
            <thead>
                <tr>
                    <th className="text-secondary text-center">#</th>
                    <th className="text-secondary">Team</th>
                    <th className="text-secondary text-center">PL</th>
                    <th className="text-secondary text-center">W</th>
                    <th className="text-secondary text-center">D</th>
                    <th className="text-secondary text-center">L</th>
                    <th className="text-secondary text-center">+/-</th>
                    <th className="text-secondary text-center">GD</th>
                    <th className="text-secondary text-center">PTS</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((team, index) => {
                    return (
                        <tr key={team.name} className={`${index === 0 ? "text-primary" : ""}`}>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{index + 1}</td>
                            <td className={index === 0 ? "text-primary" : ""}>
                                <div className="d-flex flex-row gap-2">
                                    <div><Image src={team.badgeUrl ? team.badgeUrl : '/badge.svg'} alt={team.name} width={30} height={30} /></div>
                                    <div>{team.name}</div>
                                </div>
                            </td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.played}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.wins}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.draws}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.losses}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.goalsFor}-{team.goalsAgainst}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.goalsFor - team.goalsAgainst}</td>
                            <td className={`text-center ${index === 0 ? "text-primary" : ""}`}>{team.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}