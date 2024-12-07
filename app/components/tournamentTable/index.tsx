import { TableRow } from "@/app/lib/types";

interface TournamentTableProps {
  tableRows: TableRow[];
}

const renderTableRow = (row: TableRow, index: number, isFirst: boolean) => (
  <tr key={index + 1}>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.position}</td>
    <td className={`${isFirst ? 'text-primary' : 'text-start'}`}>{row.team_name}</td>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.games_played}</td>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.won}</td>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.draw}</td>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.loss}</td>
    <td className={`text-center d-none d-sm-table-cell ${isFirst ? 'text-primary' : ''}`}>{row.goals_scored}</td>
    <td className={`text-center d-none d-sm-table-cell ${isFirst ? 'text-primary' : ''}`}>{row.goals_conceded}</td>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.goal_difference}</td>
    <td className={`text-center ${isFirst ? 'text-primary' : ''}`}>{row.points}</td>
  </tr>
);

const TournamentTable: React.FC<TournamentTableProps> = ({ tableRows }) => (
  <>
    <h2 className="text-primary">Table</h2>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className="text-secondary">Team</th>
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
        {tableRows.map((row, index) => renderTableRow(row, index, index === 0))}
      </tbody>
    </table>
  </>
);

export default TournamentTable;