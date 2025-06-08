"use client";

import { State, updateClubPlayer } from "@/app/lib/actions"
import { Country, Platform, Player, Position } from "@prisma/client";
import Form from 'next/form';
import { startTransition, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function EditProfileForm(
    {
        player,
        platforms,
        positions,
        countries,
    }: {
        player: Player,
        platforms: Platform[],
        positions: Position[],
        countries: Country[]
    }
) {
    const [formState, setFormState] = useState({
        kitName: player.kitName || "",
        gamertag: player.gamertag || "",
        primaryPositionId: player.primaryPositionId || "",
        secondaryPositionId: player.secondaryPositionId || "",
        platformId: player.platformId || "",
        countryId: player.countryId || "",
        youtube: player.youtube || "",
        twitch: player.twitch || "",
        eaId: player.eaId || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        console.log(id, value);
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const initialState: State = { message: null, errors: {} };
    const updatePlayerWithId = updateClubPlayer.bind(null, player.id);
    const [state, formAction] = useActionState(updatePlayerWithId, initialState);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
    }

    return (
        <>
            <div className="p-3 bg-body-tertiary rounded-3">
                <Form onSubmit={handleSubmit} action={formAction}>
                    <div className="mb-3">
                        <label htmlFor="discordUsername" className="form-label">Discord username</label>
                        <input type="text" className="form-control" name="discordUsername" id="discordUsername" aria-describedby="discordUsernameHelp" value={player.discordUsername} disabled />
                        <input type="hidden" className="form-control" name="discordUsername" id="discordUsername" value={player.discordUsername} />
                        <div id="discordUsernameHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="kitName" className="form-label">Kit name <span className="text-primary">*</span></label>
                        <input type="text" className={`form-control ${state?.errors?.kitName && formState.kitName === "" ? 'is-invalid' : ''}`} name="kitName" id="kitName" aria-describedby="kitNameHelp" value={formState.kitName} onChange={handleChange} />
                        <div id="kitNameHelp" className="form-text">This is the name you choose to display on the back of your kit, and it is the name that also shows when reporting stats. Make sure this is updated, so we know who to attribute stats to.</div>
                        {state?.errors?.kitName &&
                            <div className="invalid-feedback">
                                {state.errors?.kitName &&
                                    state.errors.kitName.map((error: string) => (
                                        <p key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gamertag" className="form-label">Gamertag <span className="text-primary">*</span></label>
                        <input type="text" className={`form-control ${state?.errors?.gamertag && formState.gamertag === "" ? "is-invalid" : ""}`} name="gamertag" id="gamertag" aria-describedby="gamertagHelp" value={formState.gamertag} onChange={handleChange} />
                        <div id="gamertagHelp" className="form-text"></div>
                        {state?.errors?.gamertag &&
                            <div className="invalid-feedback">
                                {state.errors?.gamertag &&
                                    state.errors.gamertag.map((error: string) => (
                                        <p key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="platformId" className="form-label">Platform <span className="text-primary">*</span></label>
                        <select className={`form-select ${state?.errors?.platformId && formState.platformId === "" ? "is-invalid" : ""}`} name="platformId" id="platformId" aria-describedby="platformIdHelp" value={formState.platformId} onChange={handleChange}>
                            <option></option>
                            {
                                platforms.map((platform) => {
                                    return <option key={platform.id} value={platform.id}>{platform.name}</option>
                                })
                            }
                        </select>
                        <div id="platformIdHelp" className="form-text"></div>
                        {state?.errors?.platformId &&
                            <div className="invalid-feedback">
                                {state.errors?.platformId &&
                                    state.errors.platformId.map((error: string) => (
                                        <p key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country <span className="text-primary">*</span></label>
                        <select className={`form-select ${state?.errors?.countryId && formState.countryId === "" ? "is-invalid" : ""}`} name="countryId" id="countryId" aria-describedby="countryHelp" value={formState.countryId} onChange={handleChange}>
                            <option></option>
                            {
                                countries.map((country) => {
                                    return <option key={country.id} value={country.id}>{country.name} {country.emoji}</option>
                                })
                            }
                        </select>
                        <div id="countryHelp" className="form-text"></div>
                        {state?.errors?.countryId &&
                            <div className="invalid-feedback">
                                {state.errors?.countryId &&
                                    state.errors.countryId.map((error: string) => (
                                        <p key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="primaryPosition" className="form-label">Primary position <span className="text-primary">*</span></label>
                        <select className={`form-select ${state?.errors?.primaryPositionId && formState.primaryPositionId === "" ? "is-invalid" : ""}`} name="primaryPositionId" id="primaryPositionId" title="Primary position" aria-describedby="primaryPositionHelp" value={formState.primaryPositionId} onChange={handleChange}>
                            <option></option>
                            {
                                positions.map((position) => {
                                    return <option key={`primary-${position.id}`} value={position.id}>{`${position.shortName} (${position.name})`}</option>
                                })
                            }
                        </select>
                        <div id="primaryPositionHelp" className="form-text"></div>
                        {state?.errors?.primaryPositionId &&
                            <div className="invalid-feedback">
                                {state.errors?.primaryPositionId &&
                                    state.errors.primaryPositionId.map((error: string) => (
                                        <p key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="secondaryPosition" className="form-label">Secondary position <span className="text-primary">*</span></label>
                        <select className={`form-select ${state?.errors?.secondaryPositionId && formState.secondaryPositionId === "" ? "is-invalid" : ""}`} name="secondaryPositionId" id="secondaryPositionId" title="Secondary position" aria-describedby="secondaryPositionHelp" value={formState.secondaryPositionId} onChange={handleChange}>
                            <option></option>
                            {
                                positions.map((position) => {
                                    return <option key={`secondary-${position.id}`} value={position.id}>{`${position.shortName} (${position.name})`}</option>
                                })
                            }
                        </select>
                        <div id="secondaryPositionHelp" className="form-text"></div>
                        {state?.errors?.secondaryPositionId &&
                            <div className="invalid-feedback">
                                {state.errors?.secondaryPositionId &&
                                    state.errors.secondaryPositionId.map((error: string) => (
                                        <p key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eaId" className="form-label">EA ID</label>
                        <input type="text" className="form-control" name="eaId" id="eaId" aria-describedby="eaIdHelp" value={formState.eaId} onChange={handleChange} />
                        <div id="eaIdHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="youtube" className="form-label">YouTube</label>
                        <div className="input-group">
                            <div className="input-group-text">https://youtube.com/</div>
                            <input type="text" className="form-control" name="youtube" id="youtube" aria-describedby="youtubeHelp" value={formState.youtube} onChange={handleChange} />
                            <div id="youtubeHelp" className="form-text"></div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="twitch" className="form-label">Twitch</label>
                        <div className="input-group">
                            <div className="input-group-text">https://twitch.tv/</div>
                            <input type="text" className="form-control" name="twitch" id="twitch" aria-describedby="twitchHelp" value={formState.twitch} onChange={handleChange} />
                            <div id="twitchHelp" className="form-text"></div>
                        </div>
                    </div>
                    <div className="mb-3 text-center">
                        <div className="mb-3">
                            <SubmitButton />
                        </div>
                        {state.message === "Success" &&
                            <div className="text-success">
                                Profile updated!
                            </div>}
                        {state.message === "Error" &&
                            <div className="text-danger">
                                Complete the required fields and try again
                            </div>}
                    </div>
                </Form>
            </div>
        </>
    )
}

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <>
            <button type="submit" className="btn btn-primary" disabled={pending}>
                {!pending ?
                    "Save" :
                    <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className="visually-hidden" role="status">Saving...</span>
                    </>
                }
            </button>
        </>
    )
}