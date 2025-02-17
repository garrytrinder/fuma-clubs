import Link from "next/link";

export default function Page() {
  return <>
    <h1 className="text-primary">League Rules</h1>
    <h2 className="text-secondary">EQUITY RULES</h2>
    <ul>
      <li><b className="text-primary">All players must record the game and display, before the kick-off, their manual settings and the statistics of their pro</b> (<Link href="/controller-settings">Controller Settings</Link>)</li>
      <li>Lobbed through ball (LB + Y / L1 + Triangle) is prohibited. See <Link href="https://answers.ea.com/t5/Bug-Reports/Master-Switch-overwriting-Manual-Lob-Through-Passes-to-Assisted/m-p/14072149#M1073">Master Switch overwriting Manual Lob Through Passes to Assisted</Link>.</li>
      <li>At least <b className="text-primary">one player per team</b> must stream and sharing the game to promote our community to others.</li>
      <li>In case of doubt (based on the stream), the captains <b className="text-primary">can request</b> the recording of a player. If recording is not provided in 7 days, the player and his team will be sanctioned.</li>
    </ul>
    <h2 className="text-secondary">LEAGUE FORMAT</h2>
    <ul>
      <li><b className="text-primary">1 matchday / week</b> =&gt; 2 games against the same team (Home/Away).</li>
      <li><b className="text-primary">The captains</b> agree on the day and time of the matches.</li>
      <li><b className="text-primary">Minimum 10 players</b> required to play the league.</li>
      <li>W = 3pts; D = 1pts ; L = 0pts / No extra-time</li>
      <li>In case of equality of points, the leaderboard shall follow this order:</li>

      <ul>
        <li>Goal difference</li>
        <li>Number of goals scored</li>
        <li>Direct head-to-head</li>
      </ul>

      <li><b className="text-primary">1 joker per team/season</b> =&gt; Joker allows a match to be postponed. This must be played the following week in addition to the match scheduled on the calendar.</li>
      <li><b className="text-primary">The match must be streamed by both teams.</b></li>
      <li>After the matchday, both team captains must report results, ratings, goals, assists, clean sheet, MOTM & red cards.</li>
      <li><b className="text-primary">RED CARD = 1 BAN MATCH</b></li>
      <li>One break week in the middle of the season.</li>
    </ul>
    <h2 className="text-secondary">PLAYER CREATION</h2>
    <ul>
      <li>All outfield players must use GK position.</li>
      <li>No restrictions on skill points or PlayStyles for outfield players.</li>
      <li>Real goalkeepers are 80 rated with no additional skill points or PlayStyles.</li>
      <li>Max height: 6ft 2/ 189cm</li>
      <li>Max weight: 88kg / 194lbs</li>
      <li>Min height: 5ft 5 / 167cm</li>
      <li>Min weight: 69kg / 159lbs</li>
      <li>Men and women allowed.</li>
      <li>Accessories allowed.</li>
    </ul>
    <h2 className="text-secondary">LEADERBOARD / PLAYER STATS</h2>
    <p>DATA to enter by captains for each match:</p>
    <ul>
      <li>Rating</li>
      <li>Goals</li>
      <li>Assists</li>
      <li>MOTM</li>
      <li>Clean sheet (GK only)</li>
      <li>Red cards system (<b className="text-primary">1 red card = 1 match ban</b>)</li>
    </ul>
    <p>In addition to the team ranking, we will find a personalized ranking for each of these elements (with the exception of the ranking for red cards).</p>
    <h2 className="text-secondary">FREE PLAYERS CONTRIBUTION</h2>
    <ul>
      <li>Free players can join a team in order to play in the league at any time but must be transferred before.</li>
      <li>Once transferred, a player cannot play for another team until the transfer window.</li>
    </ul>
    <h2 className="text-secondary">TRANSFER WINDOW</h2>
    <ul>
      <li>The transfer period is open between each season.</li>
      <li>Each club can register max. 17 players</li>
      <li>&quot;Free-players&quot; (players without a club) are free to join a club at anytime, but Team Players will have to wait until transfer period to move in other team.</li>
      <li><b className="text-primary">No player can play for two teams during the same season.</b></li>
      <li>All transfers and status change have to be reported by captains in <Link href="https://discord.com/channels/882539898953949204/1064517191661256716">transfer-news</Link> channel on Discord</li>
    </ul>
    <h2 className="text-secondary">MAIN ISSUES AND CONSEQUENCES</h2>
    <p><b className="text-primary">Each situation is unique but you will find here the generic consequences (the most serious) in the case where an admin has to make a decision. No admin will intervene if the captains manage to find an arrangement between themselves:</b></p>
    <h3>1) Disconnection</h3>
    <p>If a player is disconnected during an official game (voluntarily or not), the game shall continue playing to its end except if 2 captains are agree to restart and only if the disconnection takes place during the first half and there is no goal.</p>
    <p>If all the team disconnects without the opponents captain&apos;s consent, the match will end in defeat for the team who disconnected (3-0).</p>
    <h3>2) Cheat / Rules infringement</h3>
    <ul>
      <li>If your avatar doesn&apo;t respect the restrictions mentioned above = Team defeat (3 - 0)</li>
      <li>At the request of an opponent&apos;s captain (<b className="text-primary">EXCEPTIONAL CASE</b>):
        <ol>
          <li>The video is sent but no commands are displayed = Team defeat (3 - 0)</li>
          <li>The video is not sent = Team defeat (3 - 0)  + 1 matchday ban for the player.</li>
          <li>The video is sent and displays auto commands = Team defeat (3 - 0) + Ban of the player for the current season.</li>
        </ol>
      </li>
    </ul>
    <h3>3) Team retirement</h3>
    <p>If an entire team drops out during the season, all results of this team are deleted (even the matches already played)</p>
  </>;
}