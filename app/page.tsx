import Link from "next/link";

export default async function HomePage() {
  return <>
    <div className="px-4 py-5 text-center">
      <h1 className="display-5 fw-bold text-primary">Full Manual<br />EA Sports FC<br />Pro Clubs League</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Join us and take part in the experience!</p>
      </div>
    </div>
    <section className="col-xxl-8 mx-auto p-4 my-3 rounded-3 border shadow-lg">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-lg-12">
          <h2 className="display-5 fw-bold text-primary lh-1 mb-3 text-center">Season Two</h2>
          <p className="lead">
            Season Two is under way and teams are competing for the title of FUMA Clubs champions. Check out the latest table and results!
          </p>
          <div className="d-gri`d gap-2 d-md-flex justify-content-center">
            <Link className="btn btn-primary btn-lg px-4 me-md-2" href="/tournament/1">Table and results</Link>
          </div>
        </div>
      </div>
    </section>
    <div className="divider"></div>
    <section className="col-xxl-8 mx-auto p-4 my-3 rounded-3 border shadow-lg">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-lg-12">
          <h2 className="display-5 fw-bold text-primary lh-1 mb-3 text-center">Take part!</h2>
          <p className="lead">
            Do you want to experience the thrill of playing in a competitive league with like-minded players? Do you want to test your skills against the best full manual Pro Clubs teams in the world? Then FUMA Clubs is the place for you!
          </p>
          <p>
            Join our Discord server and get involved in the community. Play in our mix rooms, get discovered and find a team to play with. Or bring your own team and compete in our league.
          </p>
          <p>
            We are a community of players who love to play Pro Clubs on full manual settings. We are looking for players who share our passion for the game and want to play in a competitive and fair environment.
          </p>
          <div className="d-gri`d gap-2 d-md-flex justify-content-center">
            <a className="btn btn-primary btn-lg px-4 me-md-2" href="https://discord.gg/5qWVPBWmzQ" target="_blank">Join today!</a>
          </div>
        </div>
      </div>
    </section>
  </>
}