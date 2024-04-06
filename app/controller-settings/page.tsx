export default function ControllerSettingsPage() {
  return <>
    <h1 className="text-primary">Controller Settings</h1>
    <p>Please ensure you set the following controller settings in the main menu before the match starts.</p>
    <p>Each captain should confirm with all their players that they have done this and then report in the captains chat before each game that the check is complete.</p>
    <h2 className="text-secondary">1. GAMEPLAY</h2>
    <h3>PRESETS</h3>
    <ul>
      <li>Preset: <b className="text-primary">COMPETITIVE</b></li>
    </ul>
    <p>The preset COMPETITIVE is forced in Pro Clubs game mode and locks some controller settings to predetermined values, for these settings they are marked as LOCKED.</p>
    <h3>SHOOTING</h3>
    <ul>
      <li>Auto Shots: <b className="text-primary">LOCKED</b></li>
      <li>Assisted Headers: <b className="text-primary">LOCKED</b></li>
      <li>Shot Assistance: <b className="text-primary">Manual</b></li>
      <li>Timed Finishing: <b className="text-primary">Off</b></li>
    </ul>
    <h3>PASSING</h3>
    <ul>
      <li>Auto Flair Pass: <b className="text-primary">LOCKED</b></li>
      <li>Through Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Lobbed Through Pass: <b className="text-primary">LOCKED</b></li>
      <li>Ground Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Cross Assistance: <b className="text-primary">Manual</b></li>
      <li>Lob Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Pass Receiver Lock: <b className="text-primary">Late / Power Up / Animation Start</b></li>
      <li>Precision Pass Sensitivity: <b className="text-primary">High</b></li>
    </ul>
    <h3>DEFENDING</h3>
    <ul>
      <li>Auto Clearances: <b className="text-primary">LOCKED</b></li>
      <li>Clearance Assistance: <b className="text-primary">Directional</b></li>
      <li>Jockey: <b className="text-primary">LOCKED</b></li>
      <li>Defending: <b className="text-primary">Advanced Defending</b></li>
      <li>Pass Block Assistance: <b className="text-primary">Off</b></li>
    </ul>
    <h3>DRIBBLING</h3>
    <ul>
      <li>Contextual Dribbling: <b className="text-primary">LOCKED</b></li>
      <li>Orbit Dribbling: <b className="text-primary">On / Off</b></li>
    </ul>
    <h3>GOALKEEPER</h3>
    <ul>
      <li>Save Assistance: <b className="text-primary">Manual</b></li>
    </ul>
    <h3>CONTROLLER PREFERENCES</h3>
    <ul>
      <li>Analog Sprint: <b className="text-primary">On / Off</b></li>
      <li>Trigger Effect: <b className="text-primary">On / Off</b></li>
    </ul>
    <h2 className="text-secondary">2. VISUAL</h2>
    <ul>
      <li>Precision Pass Visuals: <b className="text-primary">Off</b></li>
      <li>Precision Shot Visuals: <b className="text-primary">Off</b></li>
    </ul>
    <p>Last updated: 04 April 2024</p>
  </>
}