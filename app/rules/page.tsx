export default function RulesPage() {
  return <>
    <h1 className="text-primary">Rules</h1>
    <h2 className="text-secondary">Equity</h2>
    <p><b className="text-primary">All players must record the game and display, before the kick-off, their manual settings and statistics of their pro.</b></p>
    <p>At least <b className="text-primary">one player per team</b> must stream and sharing the game to promote our community to others.</p>
    <p>In case of doubt (based on the stream), the captains <b className="text-primary">can request</b> the recording from any player on the opposing team. If the player is not able to provide the recording within a week of the match, the player and his team will be sanctioned.</p>
    <h2 className="text-secondary">Controller Settings</h2>
    <p>You must ensure to set the following controller settings in the main menu before the match starts.</p>
    <p>Each captain should confirm with all their players that they have done this and then report in the captains chat before each game that the check is complete.</p>
    <h3 className="text-secondary">Gameplay</h3>
    <h4>Presets</h4>
    <ul>
      <li>Preset: <b className="text-primary">Custom</b></li>
    </ul>
    <h4>Shooting</h4>
    <ul>
      <li>Auto Shots: <b className="text-primary">Off</b></li>
      <li>Assisted Headers: <b className="text-primary">Off</b></li>
      <li>Shot Assistance: <b className="text-primary">Manual</b></li>
      <li>Timed Finishing: <b className="text-primary">Off</b></li>
    </ul>
    <h4>Passing</h4>
    <ul>
      <li>Auto Flair Pass: <b className="text-primary">Off</b></li>
      <li>Through Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Lobbed Through Pass: <b className="text-primary">Manual</b></li>
      <li>Ground Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Cross Assistance: <b className="text-primary">Manual</b></li>
      <li>Lob Pass Assistance: <b className="text-primary">Manual</b></li>
      <li>Pass Receiver Lock: <b className="text-primary">Late</b></li>
    </ul>
    <h4>Defending</h4>
    <ul>
      <li>Precision Pass Sensitivity: <b className="text-primary">High</b></li>
      <li>Auto Clearances: <b className="text-primary">Off</b></li>
      <li>Clearance Assistance: <b className="text-primary">Directional</b></li>
      <li>Jockey: <b className="text-primary">Manual</b></li>
      <li>Defending: <b className="text-primary">Advanced Defending</b></li>
      <li>Pass Block Assistance: <b className="text-primary">Off</b></li>
    </ul>
    <h4>Dribbling</h4>
    <ul>
      <li>Contextual Dribbling: <b className="text-primary">Off</b></li>
      <li>Orbit Dribbling: <b className="text-primary">On / Off</b></li>
    </ul>
    <h4>Goalkeeper</h4>
    <ul>
      <li>Save Assistance: <b className="text-primary">Manual</b></li>
    </ul>
    <h4>Controller Preferences</h4>
    <ul>
      <li>Analog Sprint: <b className="text-primary">On</b></li>
      <li>Trigger Effect (PS Only): <b className="text-primary">Off</b></li>
    </ul>
    <h3 className="text-secondary">Visual</h3>
    <ul>
      <li>Precision Pass Visuals: <b className="text-primary">Off</b></li>
      <li>Precision Shot Visuals: <b className="text-primary">Off</b></li>
    </ul>
  </>;
}