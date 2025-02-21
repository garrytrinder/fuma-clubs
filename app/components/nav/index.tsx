'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import './nav.scss';
import { signIn, signOut, useSession } from "next-auth/react";
import { hrtime } from "process";

interface NavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const NavLink = ({ href, label, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <li className="nav-item">
      <Link className={`nav-link ${pathname === href ? 'active' : ''}`} href={href} onClick={onClick}>{label}</Link>
    </li>
  );
};

export const Nav = () => {
  const title = "FUMA Clubs";
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/team", label: "Teams" },
    { href: "/league-rules", label: "League Rules" },
    { href: "/controller-settings", label: "Controller Settings" },
  ];

  return (
    <nav className="navbar bg-body-primary sticky-top">
      <div className="container-fluid">

        <div className="flex-shrink-0 dropdown">
          {loading ? (
            <button className="btn btn-secondary" disabled>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span className="visually-hidden" role="status">Loading...</span>
            </button>
          ) : session && session.user && session.user.image ? (<>
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <Image src={session.user?.image} alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li><Link href="/profile" className="dropdown-item">My profile</Link></li>
              {session.user.teamId &&
                <>
                  <li><Link href={`/team/${session.user.teamId}`} className="dropdown-item">My team</Link></li>
                  <li><Link href={`/fixture`} className="dropdown-item">My fixtures</Link></li>
                </>
              }
              {session.user.isCaptain &&
                <li><Link href="/club" className="dropdown-item">My club</Link></li>
              }
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={() => signOut({ redirectTo: "/" })}>Sign out</button></li>
            </ul>
          </>) : (
            <button className="btn btn-secondary" onClick={() => signIn("discord", { redirectTo: "/" })}>Login</button>
          )}
        </div>
        <Link className="navbar-brand" href="/">{title}</Link>
        <button className="navbar-toggler" type="button" onClick={() => { setShow(true) }} aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <Image src="/menu.svg" alt="Menu toggle" height={30} width={30}></Image>
        </button>
      </div>
      <div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-primary" id="offcanvasNavbarLabel">{title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href} label={link.label} onClick={() => { setShow(false) }} />
            ))}
            <hr />
            <h5 className="offcanvas-title">Season Two</h5>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-two/scores-fixtures' ? 'active' : ''}`} href="/season-two/scores-fixtures" onClick={() => { setShow(false) }}>Scores &amp; Fixtures</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-two/table' ? 'active' : ''}`} href="/season-two/table" onClick={() => { setShow(false) }}>Table</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-two/players-stats' ? 'active' : ''}`} href="/season-two/player-stats" onClick={() => { setShow(false) }}>Player stats</Link>
            </li>
            <hr />
            <h5 className="offcanvas-title">Season One</h5>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-one/scores-fixtures' ? 'active' : ''}`} href="/season-one/scores-fixtures" onClick={() => { setShow(false) }}>Scores &amp; Fixtures</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-one/table' ? 'active' : ''}`} href="/season-one/table" onClick={() => { setShow(false) }}>Table</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};