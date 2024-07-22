import { platform } from "os";

export const dynamic = 'force-dynamic';

export default async function PreSeasonTablePage() {

  const data = [
    {
      team: "WAP Phoenix",
      played: 4,
      won: 4,
      drawn: 0,
      lost: 0,
      goalsFor: 8,
      goalsAgainst: 2,
      goalDifference: 6,
      points: 12
    },
    {
      team: "Pro Evo Network",
      played: 2,
      won: 0,
      drawn: 0,
      lost: 2,
      goalsFor: 0,
      goalsAgainst: 2,
      goalDifference: -2,
      points: 0
    },
    {
      team: "Phase 3 ESFC",
      played: 2,
      won: 0,
      drawn: 0,
      lost: 2,
      goalsFor: 2,
      goalsAgainst: 6,
      goalDifference: -4,
      points: 0
    },
    {
      team: "Innocent Manual",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      team: "FC Jogo Bonito",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      team: "Pass & Move",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      team: "Toho Spain",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      team: "Pespain FC",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      team: "Scoop Turn FC & WE United (mix)",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
  ];


  const rows = data.map(row => {
    return {
      TEAMS: row.team,
      P: row.played,
      W: row.won,
      D: row.drawn,
      L: row.lost,
      GF: row.goalsFor,
      GA: row.goalsAgainst,
      GD: row.goalDifference,
      Pts: row.points
    }
  });

  // sort rows by points, then goal difference
  rows.sort((a, b) => {
    if (a.Pts === b.Pts) {
      return b.GD - a.GD;
    } else {
      return b.Pts - a.Pts;
    }
  });

  return <>
    <h1 className="text-primary">Table</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className="text-secondary">Teams</th>
          <th className="text-secondary text-center">P</th>
          <th className="text-secondary text-center">W</th>
          <th className="text-secondary text-center">D</th>
          <th className="text-secondary text-center">L</th>
          <th className="text-secondary text-center d-none d-sm-table-cell">GF</th>
          <th className="text-secondary text-center d-none d-sm-table-cell">GA</th>
          <th className="text-secondary text-center">GD</th>
          <th className="text-secondary text-center">Pts</th>
        </tr>
      </thead>
      <tbody>
        {rows && rows.filter(row => row.TEAMS !== undefined).map((row, index: number) => {
          const isFirst = index === 0;

          return isFirst ? (
            <tr key={index + 1}>
              <td className="text-center text-primary">{index + 1}</td>
              <td className="text-primary">{row.TEAMS}</td>
              <td className="text-center text-primary">{row.P}</td>
              <td className="text-center text-primary">{row.W}</td>
              <td className="text-center text-primary">{row.D}</td>
              <td className="text-center text-primary">{row.L}</td>
              <td className="text-center text-primary d-none d-sm-table-cell">{row.GF}</td>
              <td className="text-center text-primary d-none d-sm-table-cell">{row.GA}</td>
              <td className="text-center text-primary">{row.GD}</td>
              <td className="text-center text-primary">{row.Pts}</td>
            </tr>
          ) : (
            <tr key={index + 1}>
              <td className="text-center">{index + 1}</td>
              <td>{row.TEAMS}</td>
              <td className="text-center">{row.P}</td>
              <td className="text-center">{row.W}</td>
              <td className="text-center">{row.D}</td>
              <td className="text-center">{row.L}</td>
              <td className="text-center d-none d-sm-table-cell">{row.GF}</td>
              <td className="text-center d-none d-sm-table-cell">{row.GA}</td>
              <td className="text-center">{row.GD}</td>
              <td className="text-center">{row.Pts}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>;
}