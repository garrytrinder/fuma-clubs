import React, {ReactElement} from 'react';
import * as data from './data/data.json';
import {FormData, Playstyle, ProStats} from './types';

export function App() {
  const [{position, height, weight, playstyle}, setForm] =
    React.useState<FormData>({
      position: '',
      height: '',
      weight: '',
      playstyle: '',
    });

  const heights = getHeights(position);
  const weights = getWeights(height);
  const playstyles = getPlaystyles(position);
  const baseProStats = getProStats(position, height, weight);
  const proStatsWithPlaystyle = getProStatsWithPlaystyle(
    baseProStats,
    position,
    playstyle
  );

  function getProStats(position: string, height: string, weight: string) {
    const stats = data.stats.find(pro => {
      return (
        pro.position === position &&
        pro.height === height &&
        pro.weight === weight
      );
    });

    return stats ? stats.stats : undefined;
  }

  function getProStatsWithPlaystyle(
    baseProStats: ProStats | undefined,
    position: string,
    playstyle: string
  ) {
    if (!baseProStats) return undefined;

    const style = data.playstyles.find(style => {
      return style.value === playstyle && style.position === position;
    });
    const proStatsWithPlaystyle = {...baseProStats};
    style?.modifiers.forEach(modifier => {
      proStatsWithPlaystyle[modifier.key] += modifier.value;
    });

    return proStatsWithPlaystyle;
  }

  function getHeights(position: string) {
    const heights = data.heights.find(height => {
      return height.position === position;
    });
    return heights ? heights.values : [];
  }

  function getWeights(height: string) {
    const weights = data.weights.find(weight => {
      return weight.key === height;
    });
    return weights ? weights.values : [];
  }

  function getPlaystyles(position: string) {
    const playstyles = data.playstyles
      .filter(style => {
        if (style.position === position) {
          return style;
        }
      })
      .map(style => {
        return style.value;
      });
    return playstyles ? playstyles : [];
  }

  function handlePositionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({
      ...form,
      position: value,
      height: '',
      weight: '',
      playstyle: '',
    }));
  }

  function handleHeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({...form, height: value}));
  }

  function handleWeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({...form, weight: value}));
  }

  function handlePlaystyleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    setForm(form => ({...form, playstyle: value}));
  }

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
        </div>
        {baseProStats !== undefined && (
          <TileView
            baseProStats={baseProStats}
            proStatsWithPlaystyle={proStatsWithPlaystyle}
          />
        )}
      </main>
    </>
  );
}

type TileViewProps = {
  baseProStats: ProStats;
  proStatsWithPlaystyle: ProStats | undefined;
};

function TileView({baseProStats, proStatsWithPlaystyle}: TileViewProps) {
  return (
    <div className="row gy-5">
      <div className="col-lg-4 col-md-6 col-sm-12">
        <GenericStatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Overall'}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Pace'}
          attributes={data.stat_groups.pace}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Shooting'}
          attributes={data.stat_groups.shooting}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Passing'}
          attributes={data.stat_groups.passing}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Dribbling'}
          attributes={data.stat_groups.dribbling}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Defending'}
          attributes={data.stat_groups.defending}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Physical'}
          attributes={data.stat_groups.physical}
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <StatSection
          baseProStats={baseProStats}
          proStatsWithPlaystyle={proStatsWithPlaystyle}
          title={'Goalkeeping'}
          attributes={data.stat_groups.goalkeeping}
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
        {data.length > 0 &&
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
        {data.length > 0 &&
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
        <option value="">Base</option>
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
  baseProStats: ProStats;
  proStatsWithPlaystyle: ProStats | undefined;
  title: string;
  attributes: string[];
};

function StatSection({
  baseProStats,
  proStatsWithPlaystyle,
  title,
  attributes,
}: StatSectionProps) {
  const isPlaystyle = proStatsWithPlaystyle
    ? baseProStats.overall !== proStatsWithPlaystyle.overall
    : false;

  const baseProStatsTotal = Object.keys(baseProStats)
    .filter(key => attributes.includes(key))
    .reduce((acc, key) => {
      return acc + baseProStats[key];
    }, 0);

  const proStatsWithPlaystyleTotal = proStatsWithPlaystyle
    ? Object.keys(proStatsWithPlaystyle)
        .filter(key => attributes.includes(key))
        .reduce((acc, key) => {
          return acc + proStatsWithPlaystyle[key];
        }, 0)
    : 0;

  const baseProStatsAverage = Number.parseInt(
    (baseProStatsTotal / attributes.length).toFixed(0)
  );
  const proStatsWithPlaystyleAverage = Number.parseInt(
    (proStatsWithPlaystyleTotal / attributes.length).toFixed(0)
  );

  const increase = isPlaystyle
    ? proStatsWithPlaystyleAverage - baseProStatsAverage
    : baseProStatsAverage;
  const average = isPlaystyle
    ? proStatsWithPlaystyleAverage
    : baseProStatsAverage;
  const stats =
    proStatsWithPlaystyle && isPlaystyle ? proStatsWithPlaystyle : baseProStats;

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h3>{title}</h3>
        </div>
        <div className="col text-end">
          <h3>
            <span className="text-stat-80">
              {isPlaystyle && increase > 0 ? `+${increase}` : ''}
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

      {Object.keys(stats)
        .filter(key => attributes.includes(key))
        .map((key, index) => {
          const increase = proStatsWithPlaystyle
            ? proStatsWithPlaystyle[key] - baseProStats[key]
            : 0;
          return (
            <div key={index} className="row">
              <div className="col-8">{data.stat_headings[key]}</div>
              <div className="col text-end">
                <span className="text-stat-80">
                  {increase > 0 ? `+${increase}` : ''}
                </span>
              </div>
              <div className="col text-center">
                <span className={`badge ${getStatColor(stats[key])}`}>
                  {stats[key]}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

type GenericStatSectionProps = {
  baseProStats: ProStats;
  proStatsWithPlaystyle: ProStats | undefined;
  title: string;
};

function GenericStatSection({
  baseProStats,
  proStatsWithPlaystyle,
  title,
}: GenericStatSectionProps) {
  const overall = proStatsWithPlaystyle
    ? proStatsWithPlaystyle.overall
    : baseProStats.overall;
  const overall_increase = proStatsWithPlaystyle
    ? proStatsWithPlaystyle.overall - baseProStats.overall
    : 0;
  const skill_moves = proStatsWithPlaystyle
    ? proStatsWithPlaystyle.skill_moves
    : baseProStats.skill_moves;
  const weak_foot = proStatsWithPlaystyle
    ? proStatsWithPlaystyle.weak_foot
    : baseProStats.weak_foot;

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h3>{title}</h3>
        </div>
        <div className="col text-end">
          <h3>
            <span className="text-stat-80">
              {overall_increase > 0 ? `+${overall_increase}` : ''}
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
        <div className="col-8">{data.stat_headings['skill_moves']}</div>
        <div className="col text-end">{<Rating data={skill_moves} />}</div>
      </div>
      <div className="row">
        <div className="col-8">{data.stat_headings['weak_foot']}</div>
        <div className="col-4 text-end">{<Rating data={weak_foot} />}</div>
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

  for (let i = 0; i < 5; i++) {
    const colour = data > i ? 'text-warning' : 'text-secondary';
    stars.push(<i key={i} className={`bi-star-fill ${colour}`}></i>);
  }
  return <>{stars.reverse()}</>;
}
