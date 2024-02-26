import React, { useEffect } from "react";
import * as data from "./data/data.json";
import { Stats } from "./types";

export function App() {

  const [form, setForm] = React.useState({ positionId: '', height: '', weight: '', playstyleId: '' });
  const [heights, setHeights] = React.useState<string[]>();
  const [weights, setWeights] = React.useState<string[]>();
  const [playstyles, setPlaystyles] = React.useState([{}]);
  const [hasAllValues, setHasAllValues] = React.useState(false);
  const [stat, setStat] = React.useState<Stats>();

  useEffect(() => {
    if (form.positionId) {
      const height = data.heights.find((height) => {
        return height.positionId === Number.parseInt(form.positionId);
      });
      const styles = data.playstyles.filter((playstyle) => {
        return playstyle.positionId === Number.parseInt(form.positionId);
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

    if (form.positionId && form.height && form.weight && form.playstyleId) {
      setHasAllValues(true);
    } else {
      setHasAllValues(false);
    }
  }, [form]);

  useEffect(() => {
    if (!form.positionId) {
      setForm({ positionId: '', height: '', weight: '', playstyleId: '' });
    }
  }, [form.positionId]);

  useEffect(() => {
    setForm({ ...form, weight: '' });
  }, [form.height]);

  useEffect(() => {
    if (hasAllValues) {
      const stat = data.stats.find((stat) => {
        return stat.positionId === Number.parseInt(form.positionId) && stat.height === form.height && stat.weight === form.weight;
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
    newForm[elementId] = elementId === 'positionId' || elementId === 'playstyleId' ? parseInt(value) : value;
    setForm({ ...newForm });
  }

  return <>
    <NavBar />
    <main className="container my-5">
      <div className="py-1">
        <Position data={data.positions} onChange={updateForm} />
        <Height data={heights} onChange={updateForm} disabled={!form.positionId} value={form.height} />
        <Weight data={weights} onChange={updateForm} disabled={!form.height} value={form.weight} />
        <Playstyle data={playstyles} onChange={updateForm} disabled={!form.positionId} value={form.playstyleId} />
        {/* {JSON.stringify(form, null, 2)} */}
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

export function NavBar() {
  return <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">FUMA Clubs</a>
    </div>
  </nav>
}

export function Position({ data, onChange }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="positionId" aria-label="Position" defaultValue={''} onChange={onChange}>
      <option></option>
      {data.map((position, index) => {
        return <option key={index} value={position.id}>{position.value}</option>
      })}
    </select>
    <label htmlFor="positionId">Position</label>
  </div>
}

export function Height({ data, onChange, disabled, value }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="height" aria-label="Height" value={value ? value : ''} onChange={onChange} disabled={disabled}>
      <option></option>
      {data && data.map((height, index) => {
        return <option key={index} value={height}>{height}</option>
      })}
    </select>
    <label htmlFor="height">Height</label>
  </div>
}

export function Weight({ data, onChange, disabled, value }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="weight" aria-label="Weight" value={value ? value : ''} onChange={onChange} disabled={disabled}>
      <option></option>
      {data && data.map((weight, index) => {
        return <option key={index} value={weight}>{weight}</option>
      })}
    </select>
    <label htmlFor="weight">Weight</label>
  </div>
}

export function Playstyle({ data, onChange, disabled, value }) {
  return <div className="form-floating my-3">
    <select className="form-select" id="playstyleId" aria-label="Playstyle" value={value ? value : ''} onChange={onChange} disabled={disabled}>
      <option></option>
      {data && data.map((playstyle, index) => {
        return <option key={index} value={playstyle.id}>{playstyle.value}</option>
      })}
    </select>
    <label htmlFor="playstyleId">Playstyle</label>
  </div>
}

export function StatSection({ data, title, headings }) {
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
  const minAverage = minTotal / length;
  const maxAverage = maxTotal / length;

  return <div>
    <div className="row">
      <div className="col-8"><h3>{title}</h3></div>
      <div className="col-4 text-end"><h3>{minAverage.toFixed(0)} / {maxAverage.toFixed(0)}</h3></div>
    </div>

    {Object.keys(data).map((key, index) => {
      return <div className="row">
        <div className="col-8">{headings[key]}</div>
        <div className="col-4 text-end">{data[key].min} / {data[key].max}</div>
      </div>
    })}
  </div>;
}