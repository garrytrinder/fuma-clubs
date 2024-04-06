import Link from "next/link";

export default function HomePage() {
  return <>
    <div className="px-4 py-5 text-center">
      <h1 className="display-5 fw-bold text-primary">Full Manual<br />EA Sports FC<br />Pro Clubs League</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Join us and take part in the experience!</p>
        <div className="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/HHWtEBfDOJM?si=J4iXUneWucLAByQP&amp;controls=0" title="FUMA Clubs" allow="autoplay" allowFullScreen></iframe>
        </div>
      </div>
    </div>
    <section className="col-xxl-8 mx-auto p-4 my-3 rounded-3 border shadow-lg">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-lg-12">
          <div className="d-grid gap-2 d-md-flex justify-content-center mb-3">
            <i className="bi bi-1-circle text-primary display-4"></i>
          </div>
          <h2 className="display-5 fw-bold text-primary lh-1 mb-3 text-center">Join the Discord</h2>
          <p className="lead">First of all, you must join our Discord. For that, we need you to complete a form to get some information from you. You will receive an invite to the Discord server right after you complete it.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-center">
            <a className="btn btn-primary btn-lg px-4 me-md-2" href="https://docs.google.com/forms/d/1bQXuY8itnW3WTHpNvkfOK6Jc8vgwF1zj-hX96EBsLxw/" target="_blank">Join</a>
          </div>
        </div>
      </div>
    </section>
    <div className="divider"></div>
    <section className="col-xxl-8 mx-auto p-4 rounded-3 border shadow-lg">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-lg-12">
          <div className="d-grid gap-2 d-md-flex justify-content-center mb-3">
            <i className="bi bi-2-circle text-primary display-4"></i>
          </div>
          <h2 className="display-5 fw-bold text-primary lh-1 mb-3 text-center">Create your player</h2>
          <p className="lead">To take part in the championship, your player must respect the <Link href="/build-your-pro">pro restriction system</Link>.</p>
        </div>
      </div>
    </section>
    <div className="divider"></div>
    <section className="col-xxl-8 mx-auto p-4 rounded-3 border shadow-lg">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className="col-lg-12">
          <div className="d-grid gap-2 d-md-flex justify-content-center mb-3">
            <i className="bi bi-3-circle text-primary display-4"></i>
          </div>
          <h2 className="display-5 fw-bold text-primary lh-1 mb-3 text-center">Build or join a team</h2>
          <p className="lead">To play the championship matches, your team must have a minimum of 9 players. You can either build a team and recruit players, or recieve transfer offer to join an existing team. To get scouted, you can play in our <a href="https://discord.com/channels/882539898953949204/925741917256441916">daily drop-in matches</a>.</p>
        </div>
      </div>
    </section>
    <div className="divider"></div>
  </>
}