"use client";
import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://www.fuma-clubs.com";
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "70vh" }}>
      <div className="col-lg-6 mx-auto">
        <h1 className="display-5 fw-bold text-primary mb-4">
          Site Moved
        </h1>
        <p className="lead mb-4">
          This site has moved to{" "}
          <a href="https://www.fuma-clubs.com" className="text-primary text-decoration-underline">
            https://www.fuma-clubs.com
          </a>
        </p>
        <p className="mb-4">
          You will be redirected automatically in a few seconds.
        </p>
        <p className="text-body-secondary">
          If you are not redirected,{" "}
          <a href="https://www.fuma-clubs.com" className="text-primary">
            click here
          </a>.
        </p>
      </div>
    </div>
  );
}
