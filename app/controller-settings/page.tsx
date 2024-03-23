export default function ControllerSettingsPage() {
  return <>
    <h1 className="text-primary">Controller Settings</h1>
    <p>You must ensure to set the following controller settings in the main menu before the match starts.</p>
    <p>Each captain should confirm with all their players that they have done this and then report in the captains chat before each game that the check is complete.</p>
    <h2 className="text-secondary">Gameplay</h2>
    <h3>Presets</h3>
    <ul>
      <li>Preset: <b className="text-primary">Custom</b></li>
    </ul>
    <h3>Shooting</h3>
    <ul>
      <li>Auto Shots: <b className="text-primary">Off</b></li>
      <li>Assisted Headers: <b className="text-primary">Off</b></li>
      <li>Shot Assistance: <b className="text-primary">Manual</b></li>
      <li>Timed Finishing: <b className="text-primary">Off</b></li>
    </ul>
    <h3>Passing</h3>
    <ul>
      <li>Auto Flair Pass: <b className="text-primary">Off</b></li>
      <li>Through Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Lobbed Through Pass: <b className="text-primary">Manual</b></li>
      <li>Ground Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Cross Assistance: <b className="text-primary">Manual</b></li>
      <li>Lob Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Pass Receiver Lock: <b className="text-primary">Late</b></li>
    </ul>
    <h3>Defending</h3>
    <ul>
      <li>Precision Pass Sensitivity: <b className="text-primary">High</b></li>
      <li>Auto Clearances: <b className="text-primary">Off</b></li>
      <li>Clearance Assistance: <b className="text-primary">Directional</b></li>
      <li>Jockey: <b className="text-primary">Manual</b></li>
      <li>Defending: <b className="text-primary">Advanced Defending</b></li>
      <li>Pass Block Assistance: <b className="text-primary">Off</b></li>
    </ul>
    <h3>Dribbling</h3>
    <ul>
      <li>Contextual Dribbling: <b className="text-primary">Off</b></li>
      <li>Orbit Dribbling: <b className="text-primary">On / Off</b></li>
    </ul>
    <h3>Goalkeeper</h3>
    <ul>
      <li>Save Assistance: <b className="text-primary">Manual</b></li>
    </ul>
    <h3>Controller Preferences</h3>
    <ul>
      <li>Analog Sprint: <b className="text-primary">On / Off</b></li>
      <li>Trigger Effect (PS Only): <b className="text-primary">Off</b></li>
    </ul>
    <h2 className="text-secondary">Visual</h2>
    <ul>
      <li>Precision Pass Visuals: <b className="text-primary">Off</b></li>
      <li>Precision Shot Visuals: <b className="text-primary">Off</b></li>
    </ul>
  </>
}