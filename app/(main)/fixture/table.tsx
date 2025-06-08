"use client";

import Image from 'next/image';

export interface Fixture {
    id: number;
    image: string;
    deadline: Date;
    opponent: string;
    venue: string;
}

export const FixtureTable = ({ isCaptain, fixtures }: { isCaptain: boolean, fixtures: Fixture[] }) => {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Deadline</th>
                        <th scope="col">Opponent</th>
                        <th scope="col">Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {fixtures.map(fixture => (
                        <tr key={fixture.id}>
                            <td>{fixture.deadline.toLocaleDateString()}</td>
                            <td className="d-flex align-items-center gap-2 flex-row">
                                <Image src={fixture.image ? fixture.image : '/badge.svg'} alt={fixture.opponent} width={30} height={30} />
                                <div className="flex-grow-1">
                                    {fixture.opponent}
                                </div>
                            </td>
                            <td>
                                {fixture.venue}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}