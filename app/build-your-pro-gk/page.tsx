"use client";

import React, { ReactElement } from "react";
import { Profile } from "../api/profiles/type";
import Image from "next/image";

export default function BuildYourProGkPage() {

  const [loading, setLoading] = React.useState(true);
  const [profilesData, setProfilesData] = React.useState<Profile[]>();
  const [{ position, height, weight, profile }, setForm] = React.useState({
    position: '',
    height: '',
    weight: '',
    profile: '',
  });

  const positions = Array.from(new Set(profilesData?.map(p => p.position)) || []);
  const heights = Array.from(new Set(profilesData?.filter(p => p.position === position).map(p => p.height) || []));
  const weights = Array.from(new Set(profilesData?.filter(p => p.position === position && p.height === height).map(p => p.weight) || []));
  const profiles = Array.from(new Set(profilesData?.filter(p => p.position === position && p.height === height && p.weight === weight).map(p => p.name) || []));
  const selectedProfile = profile && profilesData?.find(p => p.name === profile) || {} as Profile;

  React.useEffect(() => {
    (async () => {
      const req = await fetch('api/profiles');
      const profilesData = await req.json();
      setProfilesData(profilesData);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="row">
        <h1 className="text-primary">Build your pro: GK edition</h1>
      </div>
      {loading ? (<div className="row">
        <p>Loading...</p>
      </div>) : (
        <>
          <div className="row mb-3">
            <div className="col-lg-3 col-sm-4">
              <div className="form-floating my-3">
                <select
                  className="form-select"
                  id="position"
                  aria-label="Position"
                  value={position}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm(form => ({
                      ...form,
                      position: value,
                      height: '',
                      weight: '',
                      profile: '',
                    }));
                  }}
                >
                  <option></option>
                  {positions.map((position: string, index: number) => {
                    return (
                      <option key={index} value={position}>
                        {position}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="position">Position</label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-4">
              <div className="form-floating my-3">
                <select
                  className="form-select"
                  id="height"
                  aria-label="Height"
                  value={height}
                  disabled={!position}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm(form => ({
                      ...form,
                      height: value
                    }));
                  }}
                >
                  <option></option>
                  {heights.map((height: string, index: number) => {
                    return (
                      <option key={index} value={height}>
                        {height}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="height">Height</label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-4">
              <div className="form-floating my-3">
                <select
                  className="form-select"
                  id="weight"
                  aria-label="Weight"
                  value={weight}
                  disabled={!height}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm(form => ({
                      ...form,
                      weight: value
                    }));
                  }}
                >
                  <option></option>
                  {weights.map((weight: string, index: number) => {
                    return (
                      <option key={index} value={weight}>
                        {weight}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="weight">Weight</label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-4">
              <div className="form-floating my-3">
                <select
                  className="form-select"
                  id="profile"
                  aria-label="Profile"
                  value={profile}
                  disabled={!position || !weight || !height}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm(form => ({
                      ...form,
                      profile: value
                    }));
                  }}
                >
                  <option></option>
                  {profiles.map((profile: string, index: number) => {
                    return (
                      <option key={index} value={profile}>
                        {profile}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="profile">Profile</label>
              </div>
            </div>
          </div>
          {profile !== '' && (
            <div className="row gy-5">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="General" />
                <div className="row">
                  <div className="col-10">Max Skill Points</div>
                  <div className="col text-end">
                    <span className="badge text-bg-primary">
                      {selectedProfile.pts_max}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">Skill Moves</div>
                  <div className="col text-end">
                    <span className="text-stat-increase">
                      {selectedProfile.skill_moves > 0 ? `+${selectedProfile.skill_moves}` : ''}
                    </span>
                  </div>
                  <div className="col-4 text-end">
                    <Rating value={selectedProfile.skill_moves_total} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">Weak Foot</div>
                  <div className="col text-end">
                    <span className="text-stat-increase">
                      {selectedProfile.weak_foot > 0 ? `+${selectedProfile.weak_foot}` : ''}
                    </span>
                  </div>
                  <div className="col-4 text-end">
                    <Rating value={selectedProfile.weak_foot_total} />
                  </div>
                </div>
              </div>
              {selectedProfile.ps_max > 0 && (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <PlayStylesHeader total={selectedProfile.ps_max} />
                  {selectedProfile.ps_ballcontrol_max > 0 && (
                    <>
                      <div className="row">
                        <div className="col-10">Ball Control</div>
                        <div className="col text-end">
                          <span className="badge text-bg-primary">
                            {selectedProfile.ps_ballcontrol_max}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Image className={selectedProfile.ps_ballcontrol_silver?.includes("First Touch") ? "d-all" : "d-none"} src={`/ps_first_touch_silver.png`} alt={"First Touch"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_gold?.includes("First Touch") ? "d-all" : "d-none"} src={`/ps_first_touch_gold.png`} alt={"First Touch+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_silver?.includes("Flair") ? "d-all" : "d-none"} src={`/ps_flair_silver.png`} alt={"Flair"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_gold?.includes("Flair") ? "d-all" : "d-none"} src={`/ps_flair_gold.png`} alt={"Flair+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_silver?.includes("Press Proven") ? "d-all" : "d-none"} src={`/ps_press_proven_silver.png`} alt={"Press Proven"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_gold?.includes("Press Proven") ? "d-all" : "d-none"} src={`/ps_press_proven_gold.png`} alt={"Press Proven+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_silver?.includes("Rapid") ? "d-all" : "d-none"} src={`/ps_rapid_silver.png`} alt={"Rapid"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_gold?.includes("Rapid") ? "d-all" : "d-none"} src={`/ps_rapid_gold.png`} alt={"Rapid+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_silver?.includes("Technical") ? "d-all" : "d-none"} src={`/ps_technical_silver.png`} alt={"Technical"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_gold?.includes("Technical") ? "d-all" : "d-none"} src={`/ps_technical_gold.png`} alt={"Technical+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_silver?.includes("Trickster") ? "d-all" : "d-none"} src={`/ps_trickster_silver.png`} alt={"Trickster"} width={50} height={50} />
                          <Image className={selectedProfile.ps_ballcontrol_gold?.includes("Trickster") ? "d-all" : "d-none"} src={`/ps_trickster_gold.png`} alt={"Trickster+"} width={50} height={50} />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedProfile.ps_defending_max > 0 && (
                    <>
                      <div className="row">
                        <div className="col-10">Defending</div>
                        <div className="col text-end">
                          <span className="badge text-bg-primary">
                            {selectedProfile.ps_defending_max}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Image className={selectedProfile.ps_defending_silver?.includes("Block") ? "d-all" : "d-none"} src={`/ps_block_silver.png`} alt={"Block"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_gold?.includes("Block") ? "d-all" : "d-none"} src={`/ps_block_gold.png`} alt={"Block+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_silver?.includes("Bruiser") ? "d-all" : "d-none"} src={`/ps_bruiser_silver.png`} alt={"Bruiser"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_gold?.includes("Bruiser") ? "d-all" : "d-none"} src={`/ps_bruiser_gold.png`} alt={"Bruiser+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_silver?.includes("Intercept") ? "d-all" : "d-none"} src={`/ps_intercept_silver.png`} alt={"Intercept"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_gold?.includes("Intercept") ? "d-all" : "d-none"} src={`/ps_intercept_gold.png`} alt={"Intercept+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_silver?.includes("Jockey") ? "d-all" : "d-none"} src={`/ps_jockey_silver.png`} alt={"Jockey"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_gold?.includes("Jockey") ? "d-all" : "d-none"} src={`/ps_jockey_gold.png`} alt={"Jockey"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_silver?.includes("Slide Tackle") ? "d-all" : "d-none"} src={`/ps_slide_tackle_silver.png`} alt={"Slide Tackle"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_gold?.includes("Slide Tackle") ? "d-all" : "d-none"} src={`/ps_slide_tackle_gold.png`} alt={"Slide Tackle+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_silver?.includes("Anticipate") ? "d-all" : "d-none"} src={`/ps_anticipate_silver.png`} alt={"Anticipate"} width={50} height={50} />
                          <Image className={selectedProfile.ps_defending_gold?.includes("Anticipate") ? "d-all" : "d-none"} src={`/ps_anticipate_gold.png`} alt={"Anticipate+"} width={50} height={50} />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedProfile.ps_passing_max > 0 && (
                    <>
                      <div className="row">
                        <div className="col-10">Passing</div>
                        <div className="col text-end">
                          <span className="badge text-bg-primary">
                            {selectedProfile.ps_passing_max}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {/* <Image className={selectedProfile.ps_passing_silver?.includes("Tiki Taka") ? "d-all" : "d-none"} src={`/ps_tiki_taka_silver.png`} alt={"Tiki Taka"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_gold?.includes("Tiki Taka") ? "d-all" : "d-none"} src={`/ps_tiki_taka_gold.png`} alt={"Tiki Taka"} width={50} height={50} /> */}
                          <Image className={selectedProfile.ps_passing_silver?.includes("Incisive Pass") ? "d-all" : "d-none"} src={`/ps_incisive_pass_silver.png`} alt={"Incisive Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_gold?.includes("Incisive Pass") ? "d-all" : "d-none"} src={`/ps_incisive_pass_gold.png`} alt={"Incisive Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_silver?.includes("Pinged Pass") ? "d-all" : "d-none"} src={`/ps_pinged_pass_silver.png`} alt={"Pinged Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_gold?.includes("Pinged Pass") ? "d-all" : "d-none"} src={`/ps_pinged_pass_gold.png`} alt={"Pinged Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_silver?.includes("Long Ball Pass") ? "d-all" : "d-none"} src={`/ps_long_ball_pass_silver.png`} alt={"Long Ball Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_gold?.includes("Long Ball Pass") ? "d-all" : "d-none"} src={`/ps_long_ball_pass_gold.png`} alt={"Long Ball Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_silver?.includes("Whipped Pass") ? "d-all" : "d-none"} src={`/ps_whipped_pass_silver.png`} alt={"Whipped Pass"} width={50} height={50} />
                          <Image className={selectedProfile.ps_passing_gold?.includes("Whipped Pass") ? "d-all" : "d-none"} src={`/ps_whipped_pass_gold.png`} alt={"Whipped Pass"} width={50} height={50} />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedProfile.ps_physical_max > 0 && (
                    <>
                      <div className="row">
                        <div className="col-10">Physical</div>
                        <div className="col text-end">
                          <span className="badge text-bg-primary">
                            {selectedProfile.ps_physical_max}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Image className={selectedProfile.ps_physical_silver?.includes("Acrobatic") ? "d-all" : "d-none"} src={`/ps_acrobatic_silver.png`} alt={"Acrobatic"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_gold?.includes("Acrobatic") ? "d-all" : "d-none"} src={`/ps_acrobatic_gold.png`} alt={"Acrobatic+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_silver?.includes("Aerial") ? "d-all" : "d-none"} src={`/ps_aerial_silver.png`} alt={"Aerial"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_gold?.includes("Aerial") ? "d-all" : "d-none"} src={`/ps_aerial_gold.png`} alt={"Aerial+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_silver?.includes("Trivela") ? "d-all" : "d-none"} src={`/ps_trivela_silver.png`} alt={"Trivela"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_gold?.includes("Trivela") ? "d-all" : "d-none"} src={`/ps_trivela_gold.png`} alt={"Trivela+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_silver?.includes("Relentless") ? "d-all" : "d-none"} src={`/ps_relentless_silver.png`} alt={"Relentless"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_gold?.includes("Relentless") ? "d-all" : "d-none"} src={`/ps_relentless_gold.png`} alt={"Relentless+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_silver?.includes("Quick Step") ? "d-all" : "d-none"} src={`/ps_quick_step_silver.png`} alt={"Quick Step"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_gold?.includes("Quick Step") ? "d-all" : "d-none"} src={`/ps_quick_step_gold.png`} alt={"Quick Step+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_silver?.includes("Long Throw") ? "d-all" : "d-none"} src={`/ps_long_throw_silver.png`} alt={"Long Throw"} width={50} height={50} />
                          <Image className={selectedProfile.ps_physical_gold?.includes("Long Throw") ? "d-all" : "d-none"} src={`/ps_long_throw_gold.png`} alt={"Long Throw+"} width={50} height={50} />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedProfile.ps_shooting_max > 0 && (
                    <>
                      <div className="row">
                        <div className="col-10">Shooting</div>
                        <div className="col text-end">
                          <span className="badge text-bg-primary">
                            {selectedProfile.ps_shooting_max}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Image className={selectedProfile.ps_shooting_silver?.includes("Chip Shot") ? "d-all" : "d-none"} src={`/ps_chip_shot_silver.png`} alt={"Chip Shot"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_gold?.includes("Chip Shot") ? "d-all" : "d-none"} src={`/ps_chip_shot_gold.png`} alt={"Chip Shot+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_silver?.includes("Finesse Shot") ? "d-all" : "d-none"} src={`/ps_finesse_shot_silver.png`} alt={"Finesse"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_gold?.includes("Finesse Shot") ? "d-all" : "d-none"} src={`/ps_finesse_shot_gold.png`} alt={"Finesse+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_silver?.includes("Power Header") ? "d-all" : "d-none"} src={`/ps_power_header_silver.png`} alt={"Power Header"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_gold?.includes("Power Header") ? "d-all" : "d-none"} src={`/ps_power_header_gold.png`} alt={"Power Header+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_silver?.includes("Power Shot") ? "d-all" : "d-none"} src={`/ps_power_shot_silver.png`} alt={"Power Shot"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_gold?.includes("Power Shot") ? "d-all" : "d-none"} src={`/ps_power_shot_gold.png`} alt={"Power Shot+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_silver?.includes("Dead Ball") ? "d-all" : "d-none"} src={`/ps_dead_ball_silver.png`} alt={"Dead Ball"} width={50} height={50} />
                          <Image className={selectedProfile.ps_shooting_gold?.includes("Dead Ball") ? "d-all" : "d-none"} src={`/ps_dead_ball_gold.png`} alt={"Dead Ball+"} width={50} height={50} />
                        </div>
                      </div>
                    </>
                  )}
                  {selectedProfile.ps_goalkeeper_max > 0 && (
                    <>
                      <div className="row">
                        <div className="col-10">Goalkeeper</div>
                        <div className="col text-end">
                          <span className="badge text-bg-primary">
                            {selectedProfile.ps_shooting_max}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Image className={selectedProfile.ps_goalkeeper_silver?.includes("Far Throw") ? "d-all" : "d-none"} src={`/ps_far_throw_silver.png`} alt={"Far Throw"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_gold?.includes("Far Throw") ? "d-all" : "d-none"} src={`/ps_far_throw_gold.png`} alt={"Far Throw+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_silver?.includes("Footwork") ? "d-all" : "d-none"} src={`/ps_footwork_silver.png`} alt={"Footwork"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_gold?.includes("Footwork") ? "d-all" : "d-none"} src={`/ps_footwork_gold.png`} alt={"Footwork+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_silver?.includes("Cross Claimer") ? "d-all" : "d-none"} src={`/ps_cross_claimer_silver.png`} alt={"Cross Claimer"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_gold?.includes("Cross Claimer") ? "d-all" : "d-none"} src={`/ps_cross_claimer_gold.png`} alt={"Cross Claimer+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_silver?.includes("Rush Out") ? "d-all" : "d-none"} src={`/ps_rush_out_silver.png`} alt={"Rush Out"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_gold?.includes("Rush Out") ? "d-all" : "d-none"} src={`/ps_rush_out_gold.png`} alt={"Rush Out+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_silver?.includes("Far Reach") ? "d-all" : "d-none"} src={`/ps_far_reach_silver.png`} alt={"Far Reach"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_gold?.includes("Far Reach") ? "d-all" : "d-none"} src={`/ps_far_reach_gold.png`} alt={"far Reach+"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_silver?.includes("Quick Reflexes") ? "d-all" : "d-none"} src={`/ps_quick_reflexes_silver.png`} alt={"Quick Reflexes"} width={50} height={50} />
                          <Image className={selectedProfile.ps_goalkeeper_gold?.includes("Quick Reflexes") ? "d-all" : "d-none"} src={`/ps_quick_reflexes_gold.png`} alt={"Quick Reflexes+"} width={50} height={50} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Pace" />
                <AttributeRow attribute="Acceleration" increase={selectedProfile.acceleration} total={selectedProfile.acceleration_total} />
                <AttributeRow attribute="Sprint Speed" increase={selectedProfile.speed} total={selectedProfile.speed_total} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Shooting" />
                <AttributeRow attribute="Finishing" increase={selectedProfile.finishing} total={selectedProfile.finishing_total} />
                <AttributeRow attribute="FK Accuracy" increase={selectedProfile.fk_accuracy} total={selectedProfile.fk_accuracy_total} />
                <AttributeRow attribute="Heading Accuracy" increase={selectedProfile.heading_accuracy} total={selectedProfile.heading_accuracy_total} />
                <AttributeRow attribute="Shot Power" increase={selectedProfile.shot_power} total={selectedProfile.shot_power_total} />
                <AttributeRow attribute="Long Shots" increase={selectedProfile.long_shots} total={selectedProfile.long_shots_total} />
                <AttributeRow attribute="Volleys" increase={selectedProfile.volleys} total={selectedProfile.volleys_total} />
                <AttributeRow attribute="Penalties" increase={selectedProfile.penalties} total={selectedProfile.penalties_total} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Passing" />
                <AttributeRow attribute="Vision" increase={selectedProfile.vision} total={selectedProfile.vision_total} />
                <AttributeRow attribute="Crossing" increase={selectedProfile.crossing} total={selectedProfile.crossing_total} />
                <AttributeRow attribute="Long Pass" increase={selectedProfile.long_pass} total={selectedProfile.long_pass_total} />
                <AttributeRow attribute="Short Pass" increase={selectedProfile.short_pass} total={selectedProfile.short_pass_total} />
                <AttributeRow attribute="Curve" increase={selectedProfile.curve} total={selectedProfile.curve_total} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Dribbling" />
                <AttributeRow attribute="Agility" increase={selectedProfile.agility} total={selectedProfile.agility_total} />
                <AttributeRow attribute="Balance" increase={selectedProfile.balance} total={selectedProfile.balance_total} />
                <AttributeRow attribute="Attacking Position" increase={selectedProfile.attacking_position} total={selectedProfile.attacking_position_total} />
                <AttributeRow attribute="Ball Control" increase={selectedProfile.ball_control} total={selectedProfile.ball_control_total} />
                <AttributeRow attribute="Dribbling" increase={selectedProfile.dribbling} total={selectedProfile.dribbling_total} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Defending" />
                <AttributeRow attribute="Interceptions" increase={selectedProfile.interceptions} total={selectedProfile.interceptions_total} />
                <AttributeRow attribute="Defensive Awareness" increase={selectedProfile.defensive_awareness} total={selectedProfile.defensive_awareness_total} />
                <AttributeRow attribute="Stand Tackle" increase={selectedProfile.stand_tackle} total={selectedProfile.stand_tackle_total} />
                <AttributeRow attribute="Slide Tackle" increase={selectedProfile.slide_tackle} total={selectedProfile.slide_tackle_total} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Physical" />
                <AttributeRow attribute="Jumping" increase={selectedProfile.jumping} total={selectedProfile.jumping_total} />
                <AttributeRow attribute="Stamina" increase={selectedProfile.stamina} total={selectedProfile.stamina_total} />
                <AttributeRow attribute="Strength" increase={selectedProfile.strength} total={selectedProfile.strength_total} />
                <AttributeRow attribute="Reactions" increase={selectedProfile.reactions} total={selectedProfile.reactions_total} />
                <AttributeRow attribute="Aggression" increase={selectedProfile.aggression} total={selectedProfile.aggression_total} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Goalkeeping" />
                <AttributeRow attribute="GK Diving" increase={selectedProfile.gk_diving} total={selectedProfile.gk_diving_total} />
                <AttributeRow attribute="GK Handling" increase={selectedProfile.gk_handling} total={selectedProfile.gk_handling_total} />
                <AttributeRow attribute="GK Kicking" increase={selectedProfile.gk_kicking} total={selectedProfile.gk_kicking_total} />
                <AttributeRow attribute="GK Positioning" increase={selectedProfile.gk_positioning} total={selectedProfile.gk_positioning_total} />
                <AttributeRow attribute="GK Reflexes" increase={selectedProfile.gk_reflexes} total={selectedProfile.gk_reflexes_total} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

type RatingProps = {
  value: number;
};

function Rating({ value }: RatingProps) {
  const stars: ReactElement[] = [];

  for (let i = 0; i < 5; i++) {
    const colour = value > i ? 'text-warning' : 'text-secondary';
    stars.push(<i key={i} className={`bi-star-fill ${colour}`}></i>);
  }
  return <>{stars.reverse()}</>;
}

function getStatColor(stat: number) {
  if (stat >= 90) return 'bg-stat-excellent';
  if (stat >= 80 && stat <= 89) return 'bg-stat-very-good';
  if (stat >= 70 && stat <= 79) return 'bg-stat-good';
  if (stat >= 60 && stat <= 69) return 'bg-stat-fair'
  if (stat >= 50 && stat <= 59) return 'bg-stat-poor';
  if (stat <= 49) return 'bg-stat-extremely-poor';
}

type AttributeRowProps = {
  attribute: string;
  increase: number;
  total: number;
}

function AttributeRow({ attribute, increase, total }: AttributeRowProps) {
  return (
    <div className="row">
      <div className="col-8">{attribute}</div>
      <div className="col text-end">
        <span className="text-stat-increase">
          {increase > 0 ? `+${increase}` : ''}
        </span>
      </div>
      <div className="col text-center">
        <span className={`badge ${getStatColor(total)}`}>
          {total}
        </span>
      </div>
    </div>
  );
};

type SectionHeaderProps = {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="row">
      <div className="col-8">
        <h3>{title}</h3>
      </div>
    </div>
  )
}

type PlayStylesHeaderProps = {
  total: number;
}

function PlayStylesHeader({ total }: PlayStylesHeaderProps) {
  return (
    <div className="row">
      <div className="col-8">
        <h3>
          PlayStyles
        </h3>
      </div>
      <div className="col text-end">
        <h3>
          <Image src={`/ps_tiki_taka_silver.png`} alt={"Tiki Taka"} width={35} height={35} />
          {' + '}
          <span className="badge text-bg-primary">
            {total}
          </span>
        </h3>
      </div>
    </div>
  )
}