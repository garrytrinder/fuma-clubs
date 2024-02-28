import React, {ReactElement, useEffect} from 'react';
import * as data from './data/data.json';
import {
  Defending,
  Dribbling,
  DropDownData,
  FormData,
  General,
  Goalkeeping,
  KeyValuePair,
  Pace,
  Passing,
  Physical,
  Playstyle,
  Shooting,
  Stats,
} from './types';

export function App() {
  const [{position, height, weight, playstyle}, setForm] =
    React.useState<FormData>({
      position: '',
      height: '',
      weight: '',
      playstyle: '',
    });

  const [{heights, weights, playstyles}, setData] =
    React.useState<DropDownData>({heights: [], weights: [], playstyles: []});

  const [stats, setStats] = React.useState<Stats>();

  function handlePositionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;

    setForm(form => ({
      ...form,
      position: value,
      height: '',
      weight: '',
      playstyle: '',
    }));

    const playstyles = data.playstyles
      .filter(playstyle => {
        return playstyle.position === value;
      })
      .map(playstyle => {
        return playstyle.value;
      });

    setData(data => ({...data, playstyles}));

    const height = data.heights.find(height => {
      return height.position === value;
    });

    if (height) {
      setData(data => ({...data, heights: height.values}));
    }
  }

  function handleHeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({...form, height: value, weight: ''}));

    if (value === '') {
      setForm(form => ({...form, playstyle: ''}));
    }

    const weight = data.weights.find(weight => {
      return weight.key === e.target.value;
    });
    if (weight) {
      setData(data => ({...data, weights: weight.values}));
    }
  }

  function handleWeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({...form, weight: value}));
    if (value === '') {
      setForm(form => ({...form, playstyle: ''}));
    }
  }

  function handlePlaystyleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({...form, playstyle: value}));
  }

  useEffect(() => {
    const player = data.stats.find(player => {
      return (
        player.position === position &&
        player.height === height &&
        player.weight === weight
      );
    });
    if (!player) setStats(undefined);
    if (player && playstyle === '') {
      setStats(player.stats);
    }
    if (player && playstyle !== '') {
      const newStats = {} as Stats;
      const style = data.playstyles.find(style => {
        return style.value === playstyle;
      });
      if (style) {
        style?.modifiers.forEach(modifier => {
          newStats[modifier.key] = player.stats[modifier.key] + modifier.value;
        });
      }
      setStats(stats => ({...stats, ...newStats}));
    }
  }, [position, height, weight, playstyle]);

  return (
    <>
      <NavBar />
      <main className="container my-5">
        <div className="row">
          <div className="col-lg-3 col-sm-4">
            <Position data={data.positions} onChange={handlePositionChange} />
          </div>
          <div className="col-lg-3 col-sm-4">
            <Height
              data={heights}
              onChange={handleHeightChange}
              disabled={!position}
              value={height}
            />
          </div>
          <div className="col-lg-3 col-sm-4">
            <Weight
              data={weights}
              onChange={handleWeightChange}
              disabled={!height}
              value={weight}
            />
          </div>
          <div className="col-lg-3 col-sm-4">
            <Playstyle
              data={playstyles}
              onChange={handlePlaystyleChange}
              disabled={!position || !height || !weight}
              value={playstyle}
            />
          </div>
          {/* <div className="row">
            <div className="col">
              {JSON.stringify({position, height, weight, playstyle}, null, 2)}
            </div>
          </div> */}
        </div>
        {stats !== undefined && (
          <TileView stats={stats} playstyle={playstyle} />
        )}
      </main>
    </>
  );
}

type TileViewProps = {
  stats: Stats;
  playstyle: string;
};

function TileView({stats, playstyle}: TileViewProps) {
  const {
    overall,
    skill_moves,
    weak_foot,
    acceleration,
    speed,
    finishing,
    fk_accuracy,
    heading_accuracy,
    shot_power,
    long_shots,
    volleys,
    penalties,
    vision,
    crossing,
    long_pass,
    short_pass,
    curve,
    agility,
    balance,
    attacking_position,
    ball_control,
    dribbling,
    interceptions,
    defensive_awareness,
    standing_tackle,
    sliding_tackle,
    jumping,
    stamina,
    strength,
    reactions,
    aggression,
    gk_diving,
    gk_handling,
    gk_kicking,
    gk_reflexes,
    gk_positioning,
  } = stats;

  const general: General = {overall, skill_moves, weak_foot};
  const pace: Pace = {acceleration, speed};
  const shooting: Shooting = {
    finishing,
    fk_accuracy,
    heading_accuracy,
    shot_power,
    long_shots,
    volleys,
    penalties,
  };
  const passing: Passing = {vision, crossing, long_pass, short_pass, curve};
  const _dribbling: Dribbling = {
    agility,
    balance,
    attacking_position,
    ball_control,
    dribbling,
  };

  const defending: Defending = {
    interceptions,
    defensive_awareness,
    standing_tackle,
    sliding_tackle,
  };

  const physical: Physical = {
    jumping,
    stamina,
    strength,
    reactions,
    aggression,
  };

  const goalkeeping: Goalkeeping = {
    gk_diving,
    gk_handling,
    gk_kicking,
    gk_reflexes,
    gk_positioning,
  };

  const style = data.playstyles.find(style => {
    return style.value === playstyle;
  });

  return (
    <div className="row gy-5">
      <div className="col-lg-4 col-md-6 col-sm-12">
        <GenericStatSection
          data={general}
          title={'Overall'}
          headings={data.stat_headings}
          playstyle={style}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={pace}
          title={'Pace'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={shooting}
          title={'Shooting'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={passing}
          title={'Passing'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={_dribbling}
          title={'Dribbling'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={defending}
          title={'Defending'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={physical}
          title={'Physical'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          data={goalkeeping}
          title={'Goalkeeping'}
          headings={data.stat_headings}
          modifiers={style?.modifiers}
        />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navbar fixed-top bg-fuma">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          FUMA Clubs
        </a>
      </div>
    </nav>
  );
}

function Position({data, onChange}) {
  return (
    <div className="form-floating my-3">
      <select
        className="form-select"
        id="position"
        aria-label="Position"
        defaultValue={''}
        onChange={onChange}
      >
        <option></option>
        {data.map((position, index) => {
          return (
            <option key={index} value={position}>
              {position}
            </option>
          );
        })}
      </select>
      <label htmlFor="position">Position</label>
    </div>
  );
}

function Height({data, onChange, disabled, value}) {
  return (
    <div className="form-floating my-3">
      <select
        className="form-select"
        id="height"
        aria-label="Height"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option></option>
        {data &&
          data.map((height, index) => {
            return (
              <option key={index} value={height}>
                {height}
              </option>
            );
          })}
      </select>
      <label htmlFor="height">Height</label>
    </div>
  );
}

function Weight({data, onChange, disabled, value}) {
  return (
    <div className="form-floating my-3">
      <select
        className="form-select"
        id="weight"
        aria-label="Weight"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option></option>
        {data &&
          data.map((weight, index) => {
            return (
              <option key={index} value={weight}>
                {weight}
              </option>
            );
          })}
      </select>
      <label htmlFor="weight">Weight</label>
    </div>
  );
}

function Playstyle({data, onChange, disabled, value}) {
  return (
    <div className="form-floating my-3">
      <select
        className="form-select"
        id="playstyle"
        aria-label="Playstyle"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option></option>
        {data &&
          data.map((playstyle, index) => {
            return (
              <option key={index} value={playstyle}>
                {playstyle}
              </option>
            );
          })}
      </select>
      <label htmlFor="playstyle">Playstyle</label>
    </div>
  );
}

type StatSectionProps = {
  data: Record<string, number>;
  title: string;
  headings: Record<string, string>;
  modifiers: KeyValuePair<string, number>[] | undefined;
};

function StatSection({data, title, headings, modifiers}: StatSectionProps) {
  if (!data) return null;
  const baseTotal = Object.keys(data).reduce((acc, key) => {
    return acc + data[key];
  }, 0);
  const length = Object.keys(data).length;
  const modifiedTotal = Object.keys(data).reduce((acc, key) => {
    const upgrade = modifiers?.find(modifier => {
      return modifier.key === key;
    });
    if (upgrade) {
      return acc + (data[key] + upgrade?.value);
    } else {
      return acc + data[key];
    }
  }, 0);
  const averageWithModifiers = Number.parseInt(
    (modifiedTotal / length).toFixed(0)
  );

  const baseTotalAverage = Number.parseInt((baseTotal / length).toFixed(0));
  const average = modifiers ? averageWithModifiers : baseTotalAverage;
  const increase = averageWithModifiers - baseTotalAverage;

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h3>{title}</h3>
        </div>
        <div className="col text-end">
          <h3>
            <span className="text-stat-80">
              {increase > 0 ? `+${increase}` : ''}
            </span>
          </h3>
        </div>
        <div className="col text-end">
          <h3>
            <span className={`badge ${getStatColor(average)}`}>
              {average.toFixed(0)}
            </span>
          </h3>
        </div>
      </div>

      {Object.keys(data).map((key, index) => {
        const upgrade = modifiers?.find(modifier => {
          return modifier.key === key;
        });
        return (
          <div key={index} className="row">
            <div className="col-8">{headings[key]}</div>
            <div className="col text-end">
              <span className="text-stat-80">
                {upgrade ? `+ ${upgrade?.value}` : ''}
              </span>
            </div>
            <div className="col text-center">
              <span className={`badge ${getStatColor(data[key])}`}>
                {data[key]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type GenericStatSectionProps = {
  data: General;
  title: string;
  headings: Record<string, string>;
  playstyle: Playstyle | undefined;
};

function GenericStatSection({
  data,
  title,
  headings,
  playstyle,
}: GenericStatSectionProps) {
  const overall = playstyle ? playstyle.overall : data.overall;
  const increase = overall - data.overall;

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h3>{title}</h3>
        </div>
        <div className="col text-end">
          <h3>
            <span className="text-stat-80">
              {increase > 0 ? `+${increase}` : ''}
            </span>
          </h3>
        </div>
        <div className="col text-end">
          <h3>
            <span className={`badge ${getStatColor(overall)}`}>{overall}</span>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-8">{headings['skill_moves']}</div>
        <div className="col-4 text-end">
          {<Rating data={data.skill_moves} />}
        </div>
      </div>
      <div className="row">
        <div className="col-8">{headings['weak_foot']}</div>
        <div className="col-4 text-end">{<Rating data={data.weak_foot} />}</div>
      </div>
    </div>
  );
}

function getStatColor(stat: number) {
  if (stat >= 90) return 'bg-stat-90';
  if (stat >= 80 && stat < 90) return 'bg-stat-80';
  if (stat >= 60 && stat < 80) return 'bg-stat-70';
  if (stat >= 50 && stat < 60) return 'bg-stat-60';
  if (stat < 50) return 'bg-stat-50';
}

function Rating({data}) {
  const stars: ReactElement[] = [];
  for (let i = 0; i < data; i++) {
    stars.push(<i key={i} className="bi-star-fill"></i>);
  }
  return <>{stars}</>;
}
