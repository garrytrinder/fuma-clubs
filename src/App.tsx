import React, { useEffect } from "react";
import * as data from "./data/data.json";
import { Stats } from "./types";

export function App() {
  const [form, setForm] = React.useState({ position: '', height: '', weight: '', playstyle: '' });
  const [heights, setHeights] = React.useState<string[]>();
  const [weights, setWeights] = React.useState<string[]>();
  const [playstyles, setPlaystyles] = React.useState([{}]);
  const [hasAllValues, setHasAllValues] = React.useState(false);
  const [stat, setStat] = React.useState<Stats>();

  useEffect(() => {
    if (form.position) {
      const height = data.heights.find((height) => {
        return height.position === form.position;
      });
      const styles = data.playstyles.filter((playstyle) => {
        return playstyle.position === form.position;
      });
      if (styles) {
        setPlaystyles([...styles]);
      }

      if (height) {
        setHeights(height.values);
        const weight = data.weights.find((weight) => {
          return weight.key === form.height;
        });
        if (weight) {
          setWeights(weight.values);
        }
      }
    }

    if (form.position && form.height && form.weight && form.playstyle) {
      setHasAllValues(true);
    } else {
      setHasAllValues(false);
    }
    console.log("form", JSON.stringify(form, null, 2));
  }, [form]);

  useEffect(() => {
    if (!form.position) {
      setForm({ position: '', height: '', weight: '', playstyle: '' });
    } else {
      setForm({ ...form, height: '', weight: '', playstyle: '' });
    }
  }, [form.position]);

  useEffect(() => {
    setForm({ ...form, weight: '' });
  }, [form.height]);

  useEffect(() => {
    if (hasAllValues) {
      const stat = data.stats.find((stat) => {
        return stat.position === form.position && stat.height === form.height && stat.weight === form.weight;
      });
      if (stat) {
        setStat(stat.stats);
      }
    }
  }, [hasAllValues]);

  function updateForm(e: React.ChangeEvent<HTMLSelectElement>) {
    const elementId = e.target.id;
    const value = e.target.value;
    const newForm = { ...form };
    newForm[elementId] = value;
    setForm({ ...newForm });
  }

  return <>
    <NavBar />
    <main className="container my-5">
      <div className="py-1">
        <Position data={data.positions} onChange={updateForm} />
        <Height data={heights} onChange={updateForm} disabled={!form.position} value={form.height} />
        <Weight data={weights} onChange={updateForm} disabled={!form.height} value={form.weight} />
        <Playstyle data={playstyles} onChange={updateForm} disabled={!form.position} value={form.playstyle} />

      </div>
      {hasAllValues &&
        <div className="row gy-5">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.pace} title={'Pace'} headings={data.stat_headings} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.shooting} title={'Shooting'} headings={data.stat_headings} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.passing} title={'Passing'} headings={data.stat_headings} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.dribbling} title={'Dribbling'} headings={data.stat_headings} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.defending} title={'Defending'} headings={data.stat_headings} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.physical} title={'Physical'} headings={data.stat_headings} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <StatSection data={stat?.goalkeeping} title={'Goalkeeping'} headings={data.stat_headings} />
          </div>
        </div>
      }
    </main>
  </>
}

function NavBar() {
  return <nav className="navbar fixed-top bg-fuma">
    <div className="container-fluid">
      <a className="navbar-brand fw-bold" href="#">FUMA Clubs</a>
    </div>
  </nav>
}

function Position({ data, onChange }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="position" aria-label="Position" defaultValue={''} onChange={onChange}>
      <option></option>
      {data.map((position, index) => {
        return <option key={index} value={position}>{position}</option>
      })}
    </select>
    <label htmlFor="position">Position</label>
  </div>
}

function Height({ data, onChange, disabled, value }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="height" aria-label="Height" value={value} onChange={onChange} disabled={disabled}>
      <option></option>
      {data && data.map((height, index) => {
        return <option key={index} value={height}>{height}</option>
      })}
    </select>
    <label htmlFor="height">Height</label>
  </div>
}

function Weight({ data, onChange, disabled, value }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="weight" aria-label="Weight" value={value} onChange={onChange} disabled={disabled}>
      <option></option>
      {data && data.map((weight, index) => {
        return <option key={index} value={weight}>{weight}</option>
      })}
    </select>
    <label htmlFor="weight">Weight</label>
  </div>
}

function Playstyle({ data, onChange, disabled, value }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="playstyle" aria-label="Playstyle" value={value} onChange={onChange} disabled={disabled}>
      <option></option>
      {data && data.map((playstyle, index) => {
        return <option key={index} value={playstyle.id}>{playstyle.value}</option>
      })}
    </select>
    <label htmlFor="playstyle">Playstyle</label>
  </div>
}

function StatSection({ data, title, headings }) {
  if (!data) return null;
  const minTotal = Object.keys(data).reduce((acc, key) => {
    if (key === 'weak_foot' || key === 'skill_moves') return acc;
    return acc + data[key].min;
  }, 0);
  const maxTotal = Object.keys(data).reduce((acc, key) => {
    if (key === 'weak_foot' || key === 'skill_moves') return acc;
    return acc + data[key].max;
  }, 0);
  const hasWeakFoot = Object.keys(data).includes('weak_foot');
  const hasSkillMoves = Object.keys(data).includes('skill_moves');
  const length = hasWeakFoot || hasSkillMoves ? Object.keys(data).length - 1 : Object.keys(data).length;
  const minAverage = Number.parseInt((minTotal / length).toFixed(0));
  const maxAverage = Number.parseInt((maxTotal / length).toFixed(0));

  return <div>
    <div className="row">
      <div className="col-6"><h3>{title}</h3></div>
      <div className="col-6 text-end"><h3><span className={`badge ${getStatColor(minAverage)}`}>{minAverage.toFixed(0)}</span> / <span className={`badge ${getStatColor(maxAverage)}`}>{maxAverage}</span></h3></div>
    </div>

    {Object.keys(data).map((key, index) => {
      return <div className="row">
        <div className="col-8">{headings[key]}</div>
        <div className="col-4 text-end">
          <span className={`badge ${getStatColor(data[key].min)}`}>{data[key].min}</span> / <span className={`badge ${getStatColor(data[key].max)}`}>{data[key].max}</span></div>
      </div>
    })}
  </div>;
}

function getStatColor(stat: number) {
  if (stat >= 90) return 'text-bg-stat-90';
  if (stat >= 80 && stat < 90) return 'text-bg-stat-80';
  if (stat >= 60 && stat < 80) return 'text-bg-stat-70';
  if (stat >= 50 && stat < 60) return 'text-bg-stat-60';
  if (stat < 50) return 'text-bg-stat-50';
}