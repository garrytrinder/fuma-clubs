import Link from "next/link";

export default function RulesPage() {
  return <>
    <h1 className="text-primary">League Rules</h1>
    <h2 className="text-secondary">A. REGISTERED TEAMS</h2>
    <ul>
      <li><Link href="/teams/manual-11">Manual 11</Link></li>
      <li><Link href="/teams/innocent-manual">Innocent Manual</Link></li>
      <li><Link href="/teams/proevonetwork">ProEvoNetwork</Link></li>
      <li><Link href="/teams/weunited">WEunited</Link></li>
      <li><Link href="/teams/scoop-turn-fc">Scoop Turn FC</Link></li>
      <li><Link href="/teams/passandmoveea">Pass&Move</Link></li>
      <li><Link href="/teams/toho-spain">Toho Spain</Link></li>
      <li><Link href="/teams/phase3-esfc">PHASE3 ESFC</Link></li>
    </ul>
    <h2 className="text-secondary">B. EQUITY RULES (FUMA SETTINGS / BUILD YOUR PRO)</h2>
    <ul>
      <li><b className="text-primary">All players must record the game and display, before the kick-off, their manual settings and the statistics of their pro</b> (<Link href="/build-your-pro">Controller Settings</Link>)</li>
      <li>At least <b className="text-primary">one player per team</b> must stream and sharing the game to promote our community to others.</li>
      <li>In case of doubt (based on the stream), the captains <b className="text-primary">can request</b> the recording of a player. If this one is not able to provide it in the week, this player and his team will be sanctioned.</li>
    </ul>
    <h2 className="text-secondary">C. LEAGUE FORMAT</h2>
    <ul>
      <li><b className="text-primary">1 matchday / week</b> =&gt; 2 games against the same team (Home/Away).</li>
      <li><b className="text-primary">The captains</b> agree on the day and time of the matches.
      </li>
      <li><b className="text-primary">Minimum 9 players</b> required to play the league + <b className="text-primary">One player must take ANY</b></li>
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
    <h2 className="text-secondary">D. PLAYER CREATION</h2>
    <ul>
      <li><Link href="/build-your-pro">Build your pro</Link> system</li>
      <li>Men and women allowed</li>
      <li>Accessories allowed</li>
      <li>The pro of each player must be validated by the captain before the matchday</li>
      <li>The captain must complete a provided Google Sheet of his team with the position/height/weight/profile from each of his players before the matchday in order to facilitate the verification.</li>
    </ul>
    <h2 className="text-secondary">E. LEADERBOARD / PLAYER STATS</h2>
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
    <h2 className="text-secondary">F. FREE PLAYERS CONTRIBUTION</h2>
    <ul>
      <li>Free players can join a team in order to play in the league at any time but must be transferred before.</li>
      <li>Once transferred, a player cannot play for another team until the transfer window.</li>
    </ul>
    <h2 className="text-secondary">G. TRANSFER WINDOW</h2>
    <ul>
      <li>The transfer period is open between each season.</li>
      <li>Each club can register max. 16 players</li>
      <li>&quot;Free-players&quot; (players without a club) are free to join a club at anytime, but Team Players will have to wait until transfer period to move in other team.</li>
      <li><b className="text-primary">No player can play for two teams during the same season.</b></li>
      <li>All transfers and status change have to be reported by captains in transfer-news channel on Discord</li>
    </ul>
    <h2 className="text-secondary">H. MAIN ISSUES AND CONSEQUENCES</h2>
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