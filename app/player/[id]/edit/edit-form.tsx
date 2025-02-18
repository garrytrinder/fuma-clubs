"use client";

import { updateProfile } from "@/app/lib/actions"
import { Country, Platform, Player, Position, Team } from "@prisma/client";

import Form from 'next/form';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SaveProfileButton from "./ui/save-profile-button";

const gamertagCheck = (gamertag: string | null) => {
    return gamertag ? gamertag.length > 3 : false
}

export default function EditProfileForm(
    { image, platforms, player, team, countries, positions }:
        { image: string, platforms: Platform[], player: Player, team: Team | null, countries: Country[], positions: Position[] }) {

    const [gamertag, setGamertag] = useState(player.gamertag);
    const isGamertagValid = gamertagCheck(gamertag);
    const [kitName, setKitName] = useState(player.kitName || "");
    const isKitNameValid = kitName.length > 0;
    const [primaryPosition, setPrimaryPosition] = useState(player.primaryPositionId || "");
    const isPrimaryPositionValid = primaryPosition !== "" && primaryPosition !== null;
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleCancel = () => {
        setLoading(true);
        router.push(`/player/${player.id}`);
    };

    return (
        <Form action={updateProfile}>
            <input type="hidden" className="form-control" name="playerId" id="playerId" defaultValue={player.id} />
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
                </div>}
            </div>
            <div className="mb-3">
                <label htmlFor="eaId" className="form-label">EA ID</label>
                <input type="text" className="form-control" name="eaId" id="eaId" aria-describedby="eaIdHelp" defaultValue={player.eaId || ""} />
                <div id="eaIdHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="kitName" className="form-label">Kit name</label>
                <input type="text" className={`form-control ${isKitNameValid ? "is-valid" : "is-invalid"}`} name="kitName" id="kitName" aria-describedby="kitNameHelp" defaultValue={player.kitName || ""} required={true} onChange={(e) => setKitName(e.target.value)} />
                <div id="kitNameHelp" className="form-text">This is the name you choose to display on the back of your kit, and it is the name that also shows when reporting stats. Make sure this is updated, so we know who to attribute stats to.</div>
                {isKitNameValid ? <div className="valid-feedback">
                    Looks good!
                </div> : <div className="invalid-feedback">
                    Please provide your kit name.
                </div>}
            </div>
            <div className="mb-3">
                <label htmlFor="primaryPosition" className="form-label">Primary position</label>
                <select className={`form-select ${isPrimaryPositionValid ? "is-valid" : "is-invalid"}`} name="primaryPositionId" id="primaryPositionId" aria-describedby="primaryPositionHelp" defaultValue={player.primaryPositionId || ""} required={true} onChange={(e) => setPrimaryPosition(e.target.value)}>
                    <option value=""></option>
                    {
                        positions.map((position) => {
                            return <option key={position.id} value={position.id}>{`${position.shortName} (${position.name})`}</option>
                        })
                    }
                </select>
                <div id="primaryPositionHelp" className="form-text"></div>
                {isPrimaryPositionValid ? <div className="valid-feedback">
                    Looks good!
                </div> : <div className="invalid-feedback">
                    Please select your primary position.
                </div>}
            </div>
            <div className="mb-3">
                <label htmlFor="secondaryPosition" className="form-label">Secondary position</label>
                <select className="form-select" name="secondaryPositionId" id="secondaryPositionId" aria-describedby="secondaryPositionHelp" defaultValue={player.secondaryPositionId || ""}>
                    <option></option>
                    {
                        positions.map((position) => {
                            return <option key={position.id} value={position.id}>{`${position.shortName} (${position.name})`}</option>
                        })
                    }
                </select>
                <div id="secondaryPositionHelp" className="form-text"></div>
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
            <div className="mb-3 text-end">
                <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span className="visually-hidden" role="status">Loading...</span>
                        </>
                    ) : (
                        "Cancel"
                    )}
                </button>
                &nbsp;
                <SaveProfileButton disabled={isGamertagValid && isKitNameValid && isPrimaryPositionValid} />
            </div>
        </Form>
    )
}