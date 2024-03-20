'use client';

import React, { ReactElement } from "react";
import { BuildYourProFormData, ProStats } from "../definitions";
import positions from './data/positions.json';
import heights from './data/heights.json';
import weights from './data/weights.json';
import profiles from './data/profiles.json';
import proStats from './data/prostats.json';
import headings from './data/attribute_headings.json';
import groups from './data/attribute_groups.json';

import HowToUse from "./components/howToUse";

export default function BuildYourProPage() {

  const [{ position, height, weight, profile }, setForm] =
    React.useState<BuildYourProFormData>({
      position: '',
      height: '',
      weight: '',
      profile: '',
    });

  const filteredHeights = getHeights(position);
  const filteredWeights = getWeights(height);
  const filteredProfiles = getProfiles(position);
  const baseProStats = getBaseProStats(position, height, weight);
  const proStatsWithProfile = getProStatsWithProfile(
    baseProStats,
    position,
    profile
  );

  function getBaseProStats(position: string, height: string, weight: string) {
    const stats = proStats.find(pro => {
      return (
        pro.position === position &&
        pro.height === height &&
        pro.weight === weight
      );
    });

    return stats ? stats.stats : undefined;
  }

  function getProStatsWithProfile(
    baseProStats: ProStats | undefined,
    position: string,
    profile: string
  ) {
    if (!baseProStats) return undefined;

    const selectedProfile = profiles.find(p => {
      return p.value === profile && p.position === position;
    });
    const proStatsWithProfile = { ...baseProStats };
    selectedProfile?.modifiers.forEach((modifier) => {
      const key = modifier.key as never;
      (proStatsWithProfile[key] as number) += modifier.value;
    });

    return proStatsWithProfile;
  }

  function getHeights(position: string) {
    const heightsForPosition = heights.find(height => {
      return height.position === position;
    });
    return heightsForPosition ? heightsForPosition.values : [];
  }

  function getWeights(height: string) {
    const weightsForHeight = weights.find(weight => {
      return weight.key === height;
    });
    return weightsForHeight ? weightsForHeight.values : [];
  }

  function getProfiles(position: string) {
    const profilesForPosition = profiles
      .filter(p => {
        if (p.position === position) {
          return p;
        }
      })
      .map(p => {
        return p.value;
      });
    return profilesForPosition ? profilesForPosition : [];
  }

  function handlePositionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setForm(form => ({
      ...form,
      position: value,
      height: '',
      weight: '',
      profile: '',
    }));
  }

  function handleHeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setForm(form => ({ ...form, height: value }));
  }

  function handleWeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setForm(form => ({ ...form, weight: value }));
  }

  function handleProfileChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setForm(form => ({ ...form, profile: value }));
  }

  type TileViewProps = {
    baseProStats: ProStats;
    proStatsWithProfile: ProStats | undefined;
  };

  function TileView({ baseProStats, proStatsWithProfile }: TileViewProps) {
    return (
      <div className="row gy-5">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <GenericStatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Overall'}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Pace'}
            attributes={groups.pace}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Shooting'}
            attributes={groups.shooting}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Passing'}
            attributes={groups.passing}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Dribbling'}
            attributes={groups.dribbling}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Defending'}
            attributes={groups.defending}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Physical'}
            attributes={groups.physical}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <StatSection
            baseProStats={baseProStats}
            proStatsWithProfile={proStatsWithProfile}
            title={'Goalkeeping'}
            attributes={groups.goalkeeping}
          />
        </div>
      </div>
    );
  }

  type PositionProps = {
    data: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    value: string;
  };

  function Position({ data, onChange, value }: PositionProps) {
    return (
      <div className="form-floating my-3">
        <select
          className="form-select"
          id="position"
          aria-label="Position"
          value={value}
          onChange={onChange}
        >
          <option></option>
          {data.map((position: string, index: number) => {
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

  type HeightProps = {
    data: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    disabled: boolean;
    value: string;
  };

  function Height({ data, onChange, disabled, value }: HeightProps) {
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
            data.map((height: string, index: number) => {
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

  type WeightProps = {
    data: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    disabled: boolean;
    value: string;
  };

  function Weight({ data, onChange, disabled, value }: WeightProps) {
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
            data.map((weight: string, index: number) => {
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

  type ProfileProps = {
    data: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    disabled: boolean;
    value: string;
  };

  function Profile({ data, onChange, disabled, value }: ProfileProps) {
    return (
      <div className="form-floating my-3">
        <select
          className="form-select"
          id="profile"
          aria-label="Profile"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Base</option>
          {data &&
            data.map((profile: string, index: number) => {
              return (
                <option key={index} value={profile}>
                  {profile}
                </option>
              );
            })}
        </select>
        <label htmlFor="profile">Profile</label>
      </div>
    );
  }

  type StatSectionProps = {
    baseProStats: ProStats;
    proStatsWithProfile: ProStats | undefined;
    title: string;
    attributes: string[];
  };

  function StatSection({
    baseProStats,
    proStatsWithProfile,
    title,
    attributes,
  }: StatSectionProps) {
    const isProfile = proStatsWithProfile
      ? baseProStats.overall !== proStatsWithProfile.overall
      : false;

    const stats =
      proStatsWithProfile && isProfile ? proStatsWithProfile : baseProStats;

    return (
      <div>
        <div className="row">
          <div className="col-8">
            <h3>{title}</h3>
          </div>
        </div>

        {Object.keys(stats)
          .filter((key: string) => attributes.includes(key))
          .map((key: string, index: number) => {
            const increase = proStatsWithProfile
              ? proStatsWithProfile[key as never] - baseProStats[key as never]
              : 0;
            return (
              <div key={index} className="row">
                <div className="col-8">{headings[key as never]}</div>
                <div className="col text-end">
                  <span className="text-stat-increase">
                    {increase > 0 ? `+${increase}` : ''}
                  </span>
                </div>
                <div className="col text-center">
                  <span className={`badge ${getStatColor(stats[key as never])}`}>
                    {stats[key as never]}
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
    proStatsWithProfile: ProStats | undefined;
    title: string;
  };

  function GenericStatSection({
    baseProStats,
    proStatsWithProfile,
    title,
  }: GenericStatSectionProps) {
    const overall = proStatsWithProfile
      ? proStatsWithProfile.overall
      : baseProStats.overall;
    const overall_increase = proStatsWithProfile
      ? proStatsWithProfile.overall - baseProStats.overall
      : 0;
    const skill_moves = proStatsWithProfile
      ? proStatsWithProfile.skill_moves
      : baseProStats.skill_moves;
    const weak_foot = proStatsWithProfile
      ? proStatsWithProfile.weak_foot
      : baseProStats.weak_foot;

    const skill_moves_increase = proStatsWithProfile
      ? proStatsWithProfile.skill_moves - baseProStats.skill_moves
      : 0;

    const weak_foot_increase = proStatsWithProfile
      ? proStatsWithProfile.weak_foot - baseProStats.weak_foot
      : 0;

    return (
      <div>
        <div className="row">
          <div className="col-8">
            <h3>{title}</h3>
          </div>
          <div className="col text-end">
            <h3>
              <span className="text-stat-increase">
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
          <div className="col">{headings['skill_moves']}</div>
          <div className="col text-end">
            <span className="text-stat-increase">
              {skill_moves_increase > 0 ? `+${skill_moves_increase}` : ''}
            </span>
          </div>
          <div className="col-4 text-end">{<Rating data={skill_moves} />}</div>
        </div>
        <div className="row">
          <div className="col">{headings['weak_foot']}</div>
          <div className="col text-end">
            <span className="text-stat-increase">
              {weak_foot_increase > 0 ? `+${weak_foot_increase}` : ''}
            </span>
          </div>
          <div className="col-4 text-end">{<Rating data={weak_foot} />}</div>
        </div>
      </div>
    );
  }

  function getStatColor(stat: number) {
    if (stat >= 90) return 'bg-stat-excellent';
    if (stat >= 80 && stat <= 89) return 'bg-stat-very-good';
    if (stat >= 70 && stat <= 79) return 'bg-stat-good';
    if (stat >= 60 && stat <= 69) return 'bg-stat-fair'
    if (stat >= 50 && stat <= 59) return 'bg-stat-poor';
    if (stat <= 49) return 'bg-stat-extremely-poor';
  }

  type RatingProps = {
    data: any;
  };

  function Rating({ data }: RatingProps) {
    const stars: ReactElement[] = [];

    for (let i = 0; i < 5; i++) {
      const colour = data > i ? 'text-warning' : 'text-secondary';
      stars.push(<i key={i} className={`bi-star-fill ${colour}`}></i>);
    }
    return <>{stars.reverse()}</>;
  }

  return <>
    <div className="row">
      <h1 className="text-primary">Build your pro</h1>
    </div>
    <div className="row my-3">
      <div className="col">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#howToUseModal">
          How to use
        </button>
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-lg-3 col-sm-4">
        <Position
          data={positions}
          onChange={handlePositionChange}
          value={position}
        />
      </div>
      <div className="col-lg-3 col-sm-4">
        <Height
          data={filteredHeights}
          onChange={handleHeightChange}
          disabled={!position}
          value={height}
        />
      </div>
      <div className="col-lg-3 col-sm-4">
        <Weight
          data={filteredWeights}
          onChange={handleWeightChange}
          disabled={!height}
          value={weight}
        />
      </div>
      <div className="col-lg-3 col-sm-4">
        <Profile
          data={filteredProfiles}
          onChange={handleProfileChange}
          disabled={!position || !height || !weight}
          value={profile}
        />
      </div>
    </div>
    {baseProStats !== undefined && (
      <TileView
        baseProStats={baseProStats}
        proStatsWithProfile={proStatsWithProfile}
      />
    )}
    <div className="modal fade" id="howToUseModal" tabIndex={-1} aria-labelledby="howToUseModal" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="howToUseModal">How to use</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <HowToUse />
          </div>
        </div>
      </div>
    </div>
  </>;
}