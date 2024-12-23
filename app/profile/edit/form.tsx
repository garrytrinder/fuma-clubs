"use client";

import { updateProfile } from "@/app/lib/actions"
import { Country, Platform, Player, Team } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const gamertagCheck = (gamertag: string | null) => {
    return gamertag ? gamertag.length > 3 : false
}

export function ProfileEditForm(
    { image, platforms, player, team, countries }:
        { image: string, platforms: Platform[], player: Player, team: Team | null, countries: Country[] }) {

    const [gamertag, setGamertag] = useState(player.gamertag);
    const isGamertagValid = gamertagCheck(gamertag);
    const { pending } = useFormStatus();

    return (
        <form action={updateProfile}>
            <div className="mb-3">
                <div className="text-center">
                    <Image src={image || ""} alt={player.gamertag || player.discordUsername} width={100} height={100} className="rounded-circle text-center" />
                </div>
                <div id="avatarHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="discordId" className="form-label">Discord ID</label>
                <input type="text" className="form-control" name="discordId" id="discordId" aria-describedby="discordIdHelp" defaultValue={player?.discordId} disabled />
                <input type="hidden" className="form-control" name="discordId" id="discordId" defaultValue={player?.discordId} />
                <div id="discordIdHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="discordUsername" className="form-label">Discord username</label>
                <input type="text" className="form-control" name="discordUsername" id="discordUsername" aria-describedby="discordUsernameHelp" defaultValue={player.discordUsername} disabled />
                <input type="hidden" className="form-control" name="discordUsername" id="discordUsername" defaultValue={player.discordUsername} />
                <div id="discordUsernameHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="team" className="form-label">Team</label>
                <input type="text" className="form-control" name="team" id="team" aria-describedby="teamHelp" defaultValue={team?.name || "Free player"} disabled />
                <input type="hidden" className="form-control" name="teamId" id="teamId" defaultValue={team?.id || "0"} />
                <div id="teamHelp" className="form-text">Incorrect? Tell us in the <Link href="https://discord.com/channels/882539898953949204/1256851625881108551">Help</Link> channel on Discord. </div>
            </div>
            <div className="mb-3">
                <label htmlFor="platformId" className="form-label">Platform</label>
                <select className="form-select" name="platformId" id="platformId" aria-describedby="platformIdHelp" defaultValue={player.platformId || ""}>
                    <option></option>
                    {
                        platforms.map((platform) => {
                            return <option key={platform.id} value={platform.id}>{platform.name}</option>
                        })
                    }
                </select>
                <div id="platformIdHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="gamertag" className="form-label">Gamertag</label>
                <input type="text" className={`form-control ${isGamertagValid ? "is-valid" : "is-invalid"}`} name="gamertag" id="gamertag" aria-describedby="gamertagHelp" defaultValue={player.gamertag || ""} required={true} onChange={(e) => setGamertag(e.target.value)} />
                <div id="gamertagHelp" className="form-text"></div>
                {isGamertagValid ? <div className="valid-feedback">
                    Looks good!
                </div> : <div className="invalid-feedback">
                    Please provide a gamertag.
                </div>
                }
            </div>
            <div className="mb-3">
                <label htmlFor="eaId" className="form-label">EA ID</label>
                <input type="text" className="form-control" name="eaId" id="eaId" aria-describedby="eaIdHelp" defaultValue={player.eaId || ""} />
                <div id="eaIdHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="youtube" className="form-label">YouTube</label>
                <div className="input-group">
                    <div className="input-group-text">https://youtube.com/</div>
                    <input type="text" className="form-control" name="youtube" id="youtube" aria-describedby="youtubeHelp" defaultValue={player.youtube || ""} />
                    <div id="youtubeHelp" className="form-text"></div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="twitch" className="form-label">Twitch</label>
                <div className="input-group">
                    <div className="input-group-text">https://twitch.tv/</div>
                    <input type="text" className="form-control" name="twitch" id="twitch" aria-describedby="twitchHelp" defaultValue={player.twitch || ""} />
                    <div id="twitchHelp" className="form-text"></div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <select className="form-select" name="countryId" id="countryId" aria-describedby="countryHelp" defaultValue={player.countryId || ""}>
                    <option></option>
                    {
                        countries.map((country) => {
                            return <option key={country.id} value={country.id}>{country.name} {country.emoji}</option>
                        })
                    }
                </select>
                <div id="countryHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary" disabled={!isGamertagValid || pending}>
                    {pending ? (
                        <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Saving...</span>
                        </>
                    ) : "Save"}
                </button>
                &nbsp;
                <button type="button" className="btn btn-secondary" onClick={(e) => redirect("/profile")}>Cancel</button>
            </div>
        </form>
    )
}