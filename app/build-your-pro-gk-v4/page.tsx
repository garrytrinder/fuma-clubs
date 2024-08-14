"use client";

import React, { ReactElement } from "react";
import { ProfileV4 } from "../api/profiles/type";
import Image from "next/image";
import { ChangelogV4 } from "../api/changelog/type";

export const dynamic = 'force-dynamic';

export default function BuildYourProGkV4Page() {

  const [loading, setLoading] = React.useState(true);
  const [profilesData, setProfilesData] = React.useState<ProfileV4[]>();
  const [changelogData, setChangelogData] = React.useState<ChangelogV4[]>();
  const [{ position }, setForm] = React.useState({
    position: ''
  });

  const positions = Array.from(new Set(profilesData?.map(p => p.position)) || []);
  const selectedPosition = profilesData?.find(p => p.position === position);

  React.useEffect(() => {
    (async () => {
      const profiles = fetch('api/profiles?api-version=3');
      const changelog = fetch('api/changelog');
      const responses = await Promise.all([profiles, changelog]);
      const data = await Promise.all([responses[0].json(), responses[1].json()]);

      setProfilesData(data[0]);
      setChangelogData(data[1]);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="row">
        <h1 className="text-primary">Build your pro: GK edition </h1>
      </div>
      {loading ? (<div className="row">
        <p>Loading...</p>
      </div>) : (
        <>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changelogV4Modal">
                {changelogData ? `${changelogData[0].version} (${changelogData[0].date})` : null}
              </button>
            </div>
          </div>
          <div className="modal fade" id="changelogV4Modal" tabIndex={-1} aria-labelledby="changelogV4Modal" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="">Changelog</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {changelogData?.map((changelog, index) =>
                    <div key={index}>
                      <h4>{changelog.version}</h4>
                      <p>{changelog.date}</p>
                      <p>{changelog.detail.split('|').map(detail => <>{detail}<br /></>)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
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
          </div>
          {selectedPosition && (
            <div className="row gy-5">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="General" />
                <div className="row">
                  <div className="col-10">Max Skill Points</div>
                  <div className="col text-end">
                    <span className="badge text-bg-primary">
                      {selectedPosition.pts_max}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">Positions</div>
                  <div className="col text-end">
                    {selectedPosition.applies_to.split(';').map((value) =>
                      <>
                        &nbsp;<span className="badge text-bg-secondary">{value}</span>
                      </>)
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col">Skill Moves</div>
                  <div className="col text-end">
                    <Rating value={selectedPosition.skill_moves} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">Weak Foot</div>
                  <div className="col text-end">
                    <Rating value={selectedPosition.weak_foot} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">Min Height</div>
                  <div className="col text-end">
                    {selectedPosition.min_height_metric} cm / {selectedPosition.min_height_imperial}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Max Height</div>
                  <div className="col text-end">
                    {selectedPosition.max_height_metric} cm / {selectedPosition.max_height_imperial}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Min Weight</div>
                  <div className="col text-end">
                    {selectedPosition.min_weight_metric} kg / {selectedPosition.min_weight_imperial} lbs
                  </div>
                </div>
                <div className="row">
                  <div className="col">Max Weight</div>
                  <div className="col text-end">
                    {selectedPosition.max_weight_metric} kg / {selectedPosition.max_weight_imperial} lbs
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12">
                <PlayStylesHeader />
                {(!hasPlayStyles(selectedPosition.ps_ballcontrol_gold, selectedPosition.ps_ballcontrol_silver) &&
                  !hasPlayStyles(selectedPosition.ps_defending_gold, selectedPosition.ps_defending_silver) &&
                  !hasPlayStyles(selectedPosition.ps_passing_gold, selectedPosition.ps_passing_silver) &&
                  !hasPlayStyles(selectedPosition.ps_physical_gold, selectedPosition.ps_physical_silver) &&
                  !hasPlayStyles(selectedPosition.ps_shooting_gold, selectedPosition.ps_shooting_silver) &&
                  !hasPlayStyles(selectedPosition.ps_goalkeeper_gold, selectedPosition.ps_goalkeeper_silver)) ?
                  <div className="row">
                    <div className="col">No PlayStyles allowed.</div>
                  </div>
                  : <div className="row">
                    <div className="col">
                      Choose from the following:
                    </div>
                  </div>
                }
                {hasPlayStyles(selectedPosition.ps_ballcontrol_gold, selectedPosition.ps_ballcontrol_silver) &&
                  <>
                    <div className="row">
                      <div className="col">Ball Control</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Image className={selectedPosition.ps_ballcontrol_silver?.includes("First Touch") ? "d-all" : "d-none"} src={`/ps_first_touch_silver.png`} alt={"First Touch"} title={"First Touch"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_gold?.includes("First Touch") ? "d-all" : "d-none"} src={`/ps_first_touch_gold.png`} alt={"First Touch+"} title={"First Touch+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_silver?.includes("Flair") ? "d-all" : "d-none"} src={`/ps_flair_silver.png`} alt={"Flair"} title={"Flair"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_gold?.includes("Flair") ? "d-all" : "d-none"} src={`/ps_flair_gold.png`} alt={"Flair+"} title={"Flair+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_silver?.includes("Press Proven") ? "d-all" : "d-none"} src={`/ps_press_proven_silver.png`} alt={"Press Proven"} title={"Press Proven"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_gold?.includes("Press Proven") ? "d-all" : "d-none"} src={`/ps_press_proven_gold.png`} alt={"Press Proven+"} title={"Press Proven+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_silver?.includes("Rapid") ? "d-all" : "d-none"} src={`/ps_rapid_silver.png`} alt={"Rapid"} title={"Rapid"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_gold?.includes("Rapid") ? "d-all" : "d-none"} src={`/ps_rapid_gold.png`} alt={"Rapid+"} title={"Rapid+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_silver?.includes("Technical") ? "d-all" : "d-none"} src={`/ps_technical_silver.png`} alt={"Technical"} title={"Technical"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_gold?.includes("Technical") ? "d-all" : "d-none"} src={`/ps_technical_gold.png`} alt={"Technical+"} title={"Technical+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_silver?.includes("Trickster") ? "d-all" : "d-none"} src={`/ps_trickster_silver.png`} alt={"Trickster"} title={"Trickster"} width={50} height={50} />
                        <Image className={selectedPosition.ps_ballcontrol_gold?.includes("Trickster") ? "d-all" : "d-none"} src={`/ps_trickster_gold.png`} alt={"Trickster+"} title={"Trickster+"} width={50} height={50} />
                      </div>
                    </div>
                  </>
                }
                {hasPlayStyles(selectedPosition.ps_defending_gold, selectedPosition.ps_defending_silver) &&
                  <>
                    <div className="row">
                      <div className="col">Defending</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Image className={selectedPosition.ps_defending_silver?.includes("Block") ? "d-all" : "d-none"} src={`/ps_block_silver.png`} alt={"Block"} title={"Block"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_gold?.includes("Block") ? "d-all" : "d-none"} src={`/ps_block_gold.png`} alt={"Block+"} title={"Block+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_silver?.includes("Bruiser") ? "d-all" : "d-none"} src={`/ps_bruiser_silver.png`} alt={"Bruiser"} title={"Bruiser"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_gold?.includes("Bruiser") ? "d-all" : "d-none"} src={`/ps_bruiser_gold.png`} alt={"Bruiser+"} title={"Bruiser+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_silver?.includes("Intercept") ? "d-all" : "d-none"} src={`/ps_intercept_silver.png`} alt={"Intercept"} title={"Intercept"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_gold?.includes("Intercept") ? "d-all" : "d-none"} src={`/ps_intercept_gold.png`} alt={"Intercept+"} title={"Intercept+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_silver?.includes("Jockey") ? "d-all" : "d-none"} src={`/ps_jockey_silver.png`} alt={"Jockey"} title={"Jockey"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_gold?.includes("Jockey") ? "d-all" : "d-none"} src={`/ps_jockey_gold.png`} alt={"Jockey"} title={"Jockey"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_silver?.includes("Slide Tackle") ? "d-all" : "d-none"} src={`/ps_slide_tackle_silver.png`} alt={"Slide Tackle"} title={"Slide Tackle"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_gold?.includes("Slide Tackle") ? "d-all" : "d-none"} src={`/ps_slide_tackle_gold.png`} alt={"Slide Tackle+"} title={"Slide Tackle+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_silver?.includes("Anticipate") ? "d-all" : "d-none"} src={`/ps_anticipate_silver.png`} alt={"Anticipate"} title={"Anticipate"} width={50} height={50} />
                        <Image className={selectedPosition.ps_defending_gold?.includes("Anticipate") ? "d-all" : "d-none"} src={`/ps_anticipate_gold.png`} alt={"Anticipate+"} title={"Anticipate+"} width={50} height={50} />
                      </div>
                    </div>
                  </>
                }
                {hasPlayStyles(selectedPosition.ps_passing_gold, selectedPosition.ps_passing_silver) &&
                  <>
                    <div className="row">
                      <div className="col">Passing</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Image className={selectedPosition.ps_passing_silver?.includes("Tiki Taka") ? "d-all" : "d-none"} src={`/ps_tiki_taka_silver.png`} alt={"Tiki Taka"} title={"Tiki Taka"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_gold?.includes("Tiki Taka") ? "d-all" : "d-none"} src={`/ps_tiki_taka_gold.png`} alt={"Tiki Taka"} title={"Tiki Taka"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_silver?.includes("Incisive Pass") ? "d-all" : "d-none"} src={`/ps_incisive_pass_silver.png`} alt={"Incisive Pass"} title={"Incisive Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_gold?.includes("Incisive Pass") ? "d-all" : "d-none"} src={`/ps_incisive_pass_gold.png`} alt={"Incisive Pass"} title={"Incisive Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_silver?.includes("Pinged Pass") ? "d-all" : "d-none"} src={`/ps_pinged_pass_silver.png`} alt={"Pinged Pass"} title={"Pinged Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_gold?.includes("Pinged Pass") ? "d-all" : "d-none"} src={`/ps_pinged_pass_gold.png`} alt={"Pinged Pass"} title={"Pinged Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_silver?.includes("Long Ball Pass") ? "d-all" : "d-none"} src={`/ps_long_ball_pass_silver.png`} alt={"Long Ball Pass"} title={"Long Ball Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_gold?.includes("Long Ball Pass") ? "d-all" : "d-none"} src={`/ps_long_ball_pass_gold.png`} alt={"Long Ball Pass"} title={"Long Ball Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_silver?.includes("Whipped Pass") ? "d-all" : "d-none"} src={`/ps_whipped_pass_silver.png`} alt={"Whipped Pass"} title={"Whipped Pass"} width={50} height={50} />
                        <Image className={selectedPosition.ps_passing_gold?.includes("Whipped Pass") ? "d-all" : "d-none"} src={`/ps_whipped_pass_gold.png`} alt={"Whipped Pass"} title={"Whipped Pass"} width={50} height={50} />
                      </div>
                    </div>
                  </>
                }
                {hasPlayStyles(selectedPosition.ps_physical_gold, selectedPosition.ps_physical_silver) &&
                  <>
                    <div className="row">
                      <div className="col">Physical</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Image className={selectedPosition.ps_physical_silver?.includes("Acrobatic") ? "d-all" : "d-none"} src={`/ps_acrobatic_silver.png`} alt={"Acrobatic"} title={"Acrobatic"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_gold?.includes("Acrobatic") ? "d-all" : "d-none"} src={`/ps_acrobatic_gold.png`} alt={"Acrobatic+"} title={"Acrobatic+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_silver?.includes("Aerial") ? "d-all" : "d-none"} src={`/ps_aerial_silver.png`} alt={"Aerial"} title={"Aerial"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_gold?.includes("Aerial") ? "d-all" : "d-none"} src={`/ps_aerial_gold.png`} alt={"Aerial+"} title={"Aerial+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_silver?.includes("Trivela") ? "d-all" : "d-none"} src={`/ps_trivela_silver.png`} alt={"Trivela"} title={"Trivela"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_gold?.includes("Trivela") ? "d-all" : "d-none"} src={`/ps_trivela_gold.png`} alt={"Trivela+"} title={"Trivela+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_silver?.includes("Relentless") ? "d-all" : "d-none"} src={`/ps_relentless_silver.png`} alt={"Relentless"} title={"Relentless"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_gold?.includes("Relentless") ? "d-all" : "d-none"} src={`/ps_relentless_gold.png`} alt={"Relentless+"} title={"Relentless+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_silver?.includes("Quick Step") ? "d-all" : "d-none"} src={`/ps_quick_step_silver.png`} alt={"Quick Step"} title={"Quick Step"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_gold?.includes("Quick Step") ? "d-all" : "d-none"} src={`/ps_quick_step_gold.png`} alt={"Quick Step+"} title={"Quick Step+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_silver?.includes("Long Throw") ? "d-all" : "d-none"} src={`/ps_long_throw_silver.png`} alt={"Long Throw"} title={"Long Throw"} width={50} height={50} />
                        <Image className={selectedPosition.ps_physical_gold?.includes("Long Throw") ? "d-all" : "d-none"} src={`/ps_long_throw_gold.png`} alt={"Long Throw+"} title={"Long Throw+"} width={50} height={50} />
                      </div>
                    </div>
                  </>
                }
                {hasPlayStyles(selectedPosition.ps_shooting_gold, selectedPosition.ps_shooting_silver) &&
                  <>
                    <div className="row">
                      <div className="col">Shooting</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Image className={selectedPosition.ps_shooting_silver?.includes("Chip Shot") ? "d-all" : "d-none"} src={`/ps_chip_shot_silver.png`} alt={"Chip Shot"} title={"Chip Shot"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_gold?.includes("Chip Shot") ? "d-all" : "d-none"} src={`/ps_chip_shot_gold.png`} alt={"Chip Shot+"} title={"Chip Shot+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_silver?.includes("Finesse Shot") ? "d-all" : "d-none"} src={`/ps_finesse_shot_silver.png`} alt={"Finesse"} title={"Finesse"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_gold?.includes("Finesse Shot") ? "d-all" : "d-none"} src={`/ps_finesse_shot_gold.png`} alt={"Finesse+"} title={"Finesse+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_silver?.includes("Power Header") ? "d-all" : "d-none"} src={`/ps_power_header_silver.png`} alt={"Power Header"} title={"Power Header"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_gold?.includes("Power Header") ? "d-all" : "d-none"} src={`/ps_power_header_gold.png`} alt={"Power Header+"} title={"Power Header+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_silver?.includes("Power Shot") ? "d-all" : "d-none"} src={`/ps_power_shot_silver.png`} alt={"Power Shot"} title={"Power Shot"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_gold?.includes("Power Shot") ? "d-all" : "d-none"} src={`/ps_power_shot_gold.png`} alt={"Power Shot+"} title={"Power Shot+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_silver?.includes("Dead Ball") ? "d-all" : "d-none"} src={`/ps_dead_ball_silver.png`} alt={"Dead Ball"} title={"Dead Ball"} width={50} height={50} />
                        <Image className={selectedPosition.ps_shooting_gold?.includes("Dead Ball") ? "d-all" : "d-none"} src={`/ps_dead_ball_gold.png`} alt={"Dead Ball+"} title={"Dead Ball+"} width={50} height={50} />
                      </div>
                    </div>
                  </>
                }
                {hasPlayStyles(selectedPosition.ps_goalkeeper_gold, selectedPosition.ps_goalkeeper_silver) &&
                  <>
                    <div className="row">
                      <div className="col">Goalkeeper</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Image className={selectedPosition.ps_goalkeeper_silver?.includes("Far Throw") ? "d-all" : "d-none"} src={`/ps_far_throw_silver.png`} alt={"Far Throw"} title={"Far Throw"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_gold?.includes("Far Throw") ? "d-all" : "d-none"} src={`/ps_far_throw_gold.png`} alt={"Far Throw+"} title={"Far Throw+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_silver?.includes("Footwork") ? "d-all" : "d-none"} src={`/ps_footwork_silver.png`} alt={"Footwork"} title={"Footwork"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_gold?.includes("Footwork") ? "d-all" : "d-none"} src={`/ps_footwork_gold.png`} alt={"Footwork+"} title={"Footwork+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_silver?.includes("Cross Claimer") ? "d-all" : "d-none"} src={`/ps_cross_claimer_silver.png`} alt={"Cross Claimer"} title={"Cross Claimer"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_gold?.includes("Cross Claimer") ? "d-all" : "d-none"} src={`/ps_cross_claimer_gold.png`} alt={"Cross Claimer+"} title={"Cross Claimer+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_silver?.includes("Rush Out") ? "d-all" : "d-none"} src={`/ps_rush_out_silver.png`} alt={"Rush Out"} title={"Rush Out"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_gold?.includes("Rush Out") ? "d-all" : "d-none"} src={`/ps_rush_out_gold.png`} alt={"Rush Out+"} title={"Rush Out+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_silver?.includes("Far Reach") ? "d-all" : "d-none"} src={`/ps_far_reach_silver.png`} alt={"Far Reach"} title={"Far Reach"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_gold?.includes("Far Reach") ? "d-all" : "d-none"} src={`/ps_far_reach_gold.png`} alt={"Far Reach+"} title={"far Reach+"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_silver?.includes("Quick Reflexes") ? "d-all" : "d-none"} src={`/ps_quick_reflexes_silver.png`} alt={"Quick Reflexes"} title={"Quick Reflexes"} width={50} height={50} />
                        <Image className={selectedPosition.ps_goalkeeper_gold?.includes("Quick Reflexes") ? "d-all" : "d-none"} src={`/ps_quick_reflexes_gold.png`} alt={"Quick Reflexes+"} title={"Quick Reflexes+"} width={50} height={50} />
                      </div>
                    </div>
                  </>
                }
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Pace" />
                <AttributeRow attribute="Acceleration" increase={selectedPosition.acceleration} />
                <AttributeRow attribute="Sprint Speed" increase={selectedPosition.speed} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Shooting" />
                <AttributeRow attribute="Finishing" increase={selectedPosition.finishing} />
                <AttributeRow attribute="FK Accuracy" increase={selectedPosition.fk_accuracy} />
                <AttributeRow attribute="Heading Accuracy" increase={selectedPosition.heading_accuracy} />
                <AttributeRow attribute="Shot Power" increase={selectedPosition.shot_power} />
                <AttributeRow attribute="Long Shots" increase={selectedPosition.long_shots} />
                <AttributeRow attribute="Volleys" increase={selectedPosition.volleys} />
                <AttributeRow attribute="Penalties" increase={selectedPosition.penalties} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Passing" />
                <AttributeRow attribute="Vision" increase={selectedPosition.vision} />
                <AttributeRow attribute="Crossing" increase={selectedPosition.crossing} />
                <AttributeRow attribute="Long Pass" increase={selectedPosition.long_pass} />
                <AttributeRow attribute="Short Pass" increase={selectedPosition.short_pass} />
                <AttributeRow attribute="Curve" increase={selectedPosition.curve} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Dribbling" />
                <AttributeRow attribute="Agility" increase={selectedPosition.agility} />
                <AttributeRow attribute="Balance" increase={selectedPosition.balance} />
                <AttributeRow attribute="Attacking Position" increase={selectedPosition.attacking_position} />
                <AttributeRow attribute="Ball Control" increase={selectedPosition.ball_control} />
                <AttributeRow attribute="Dribbling" increase={selectedPosition.dribbling} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Defending" />
                <AttributeRow attribute="Interceptions" increase={selectedPosition.interceptions} />
                <AttributeRow attribute="Defensive Awareness" increase={selectedPosition.defensive_awareness} />
                <AttributeRow attribute="Stand Tackle" increase={selectedPosition.stand_tackle} />
                <AttributeRow attribute="Slide Tackle" increase={selectedPosition.slide_tackle} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Physical" />
                <AttributeRow attribute="Jumping" increase={selectedPosition.jumping} />
                <AttributeRow attribute="Stamina" increase={selectedPosition.stamina} />
                <AttributeRow attribute="Strength" increase={selectedPosition.strength} />
                <AttributeRow attribute="Reactions" increase={selectedPosition.reactions} />
                <AttributeRow attribute="Aggression" increase={selectedPosition.aggression} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SectionHeader title="Goalkeeping" />
                <AttributeRow attribute="GK Diving" increase={selectedPosition.gk_diving} />
                <AttributeRow attribute="GK Handling" increase={selectedPosition.gk_handling} />
                <AttributeRow attribute="GK Kicking" increase={selectedPosition.gk_kicking} />
                <AttributeRow attribute="GK Positioning" increase={selectedPosition.gk_positioning} />
                <AttributeRow attribute="GK Reflexes" increase={selectedPosition.gk_reflexes} />
              </div>
            </div>
          )}
        </>
      )
      }
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

type AttributeRowProps = {
  attribute: string;
  increase: number;
}

function AttributeRow({ attribute, increase }: AttributeRowProps) {
  return (
    <div className="row">
      <div className="col-8">{attribute}</div>
      <div className="col text-end">
        {increase > 0 ?
          <span className="text-stat-increase">
            <i className="bi bi-caret-up-fill"></i> {increase}
          </span> : null}
        {increase == 0 ?
          <span className="text-stat-noincrease">
            <i className="bi bi-square-fill"></i>
          </span> : null}
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

function PlayStylesHeader() {
  return (
    <div className="row">
      <div className="col">
        <h3>
          PlayStyles
        </h3>
      </div>
    </div>
  )
}

function hasPlayStyles(gold: string[] | undefined, silver: string[] | undefined) {
  if (!gold && !silver) return false;
  if (gold?.length === 0 && silver?.length === 0) return false;
  return true;
}