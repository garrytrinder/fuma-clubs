import { ScoreFixtureRow } from "@/app/lib/types";

interface FixturesByRoundProps {
  fixturesByRound: Record<number, ScoreFixtureRow[]>;
}

const FixturesByRound: React.FC<FixturesByRoundProps> = ({ fixturesByRound }) => (
  <>
    <h2 className="text-primary">Scores and fixtures</h2>
    {Object.entries(fixturesByRound).map(([round, fixtures]) => (
      <div className="py-2" key={round}>
        <h3 className="text-primary">Round {round}</h3>
        <ul className="list-group" key={round}>
          {fixtures.map((fixture, index) => (
            <li className="list-group-item" key={index}>
              <div className="fluid-container">
                <div className="row py-2">
                  <div className="col text-end">
                    {fixture.home_team}
                  </div>
                  <div className="col-2 text-center">
                    {fixture.home_team_score} - {fixture.away_team_score}
                  </div>
                  <div className="col text-start">
                    {fixture.away_team}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

export default FixturesByRound;