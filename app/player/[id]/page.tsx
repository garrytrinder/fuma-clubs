import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import EditProfileButton from "./ui/edit-profile-button";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth();
    if (!session || !session.user) return <div>Not authenticated</div>;

    const { id } = (await params);

    const player = await prisma.player.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            team: true,
            country: true,
            platform: true
        }
    });

    if (!player) return <div>Player not found, leave a message in the <Link href="https://discord.com/channels/882539898953949204/1256851625881108551">Help</Link> channel on Discord.</div>

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                </ol>
            </nav>
            <div className="p-3 bg-body-tertiary rounded-3">
                <div className="mb-3">
                    <div className="text-center">
                        <Image src={session.user.image || ""} alt={player.gamertag || player.discordUsername} width={100} height={100} className="rounded-circle text-center" />
                    </div>
                    <div id="avatarHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="discordId" className="form-label">Discord ID</label>
                    <input type="text" className="form-control" name="discordId" id="discordId" aria-describedby="discordIdHelp" defaultValue={player?.discordId} disabled />

                    <div id="discordIdHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="discordUsername" className="form-label">Discord username</label>
                    <input type="text" className="form-control" name="discordUsername" id="discordUsername" aria-describedby="discordUsernameHelp" defaultValue={player.discordUsername} disabled />
                    <div id="discordUsernameHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="team" className="form-label">Team</label>
                    <input type="text" className="form-control" name="team" id="team" aria-describedby="teamHelp" defaultValue={player.team?.name || "Free player"} disabled />

                    <div id="teamHelp" className="form-text">Incorrect? Tell us in the <Link href="https://discord.com/channels/882539898953949204/1256851625881108551">Help</Link> channel on Discord. </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="platformId" className="form-label">Platform</label>
                    <input type="text" className="form-control" name="platformId" id="platformId" aria-describedby="platformIdHelp" defaultValue={player.platform?.name} disabled />
                    <div id="platformIdHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="gamertag" className="form-label">Gamertag</label>
                    <input type="text" className={`form-control ${!player.gamertag ? "is-invalid" : ""}`} name="gamertag" id="gamertag" aria-describedby="gamertagHelp" defaultValue={player.gamertag || ""} disabled />
                    <div id="gamertagHelp" className="form-text"></div>
                    {!player.gamertag &&
                        <div className="invalid-feedback">
                            Please provide a gamertag.
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="eaId" className="form-label">EA ID</label>
                    <input type="text" className="form-control" name="eaId" id="eaId" aria-describedby="eaIdHelp" defaultValue={player.eaId || ""} disabled />
                    <div id="eaIdHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="youtube" className="form-label">YouTube</label>
                    <div className="input-group">
                        <div className="input-group-text">https://youtube.com/</div>
                        <input type="text" className="form-control" name="youtube" id="youtube" aria-describedby="youtubeHelp" defaultValue={player.youtube || ""} disabled />
                        <div id="youtubeHelp" className="form-text"></div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="twitch" className="form-label">Twitch</label>
                    <div className="input-group">
                        <div className="input-group-text">https://twitch.tv/</div>
                        <input type="text" className="form-control" name="twitch" id="twitch" aria-describedby="twitchHelp" defaultValue={player.twitch || ""} disabled />
                        <div id="twitchHelp" className="form-text"></div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" name="country" id="country" aria-describedby="countryHelp" defaultValue={`${player.country?.name || ""} ${player.country?.emoji || ""}`} disabled />
                    <div id="countryHelp" className="form-text"></div>
                </div>
                <div className="mb-3 text-end">
                    <EditProfileButton playerId={id} />
                </div>
            </div>
        </>
    )
}