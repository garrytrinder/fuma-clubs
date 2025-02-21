"use client";

export interface FixtureRow {
    id: number;
    deadline: Date;
    opponent: string;
    venue: string;
}

export const FixtureTable = ({ isCaptain, fixtures }: { isCaptain: boolean, fixtures: FixtureRow[] }) => {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        {/* {isCaptain &&
                            <th scope="col"></th>
                        } */}
                        <th scope="col">Deadline</th>
                        <th scope="col">Opponent</th>
                        <th scope="col">Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {fixtures.map(fixture => (
                        <tr key={fixture.id}>
                            {/* {isCaptain &&
                                <td>
                                    <Link href={`/fixture/${fixture.id}/result`} className="btn btn-primary">Edit</Link>
                                </td>
                            } */}
                            <td>{fixture.deadline.toLocaleDateString()}</td>
                            <td>
                                {fixture.opponent}
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