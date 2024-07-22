'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Nav = () => {
  const title = "FUMA Clubs";
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  return <nav className="navbar bg-primary sticky-top">
    <div className="container-fluid">
      <Link className="navbar-brand" href="/">{title}</Link>
      <button className="navbar-toggler" type="button" onClick={() => { setShow(true) }} aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <Image src="/menu.svg" alt="Menu toggle" height={30} width={30}></Image>
      </button>
      <div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-primary" id="offcanvasNavbarLabel">{title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/" onClick={() => { setShow(false) }}>Home</Link>
            </li>
            <hr />
            <h5 className="offcanvas-title">Preseason</h5>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/pre-season/table' ? 'active' : ''}`} href="/pre-season/table" onClick={() => { setShow(false) }}>Table</Link>
            </li>
            <hr />
            <h5 className="offcanvas-title">Season One</h5>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-one/table' ? 'active' : ''}`} href="/season-one/table" onClick={() => { setShow(false) }}>Table</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-one/scores-fixtures' ? 'active' : ''}`} href="/season-one/scores-fixtures" onClick={() => { setShow(false) }}>Scores &amp; Fixtures</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/season-one/top-players' ? 'active' : ''}`} href="/season-one/top-players" onClick={() => { setShow(false) }}>Top Players</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/teams' ? 'active' : ''}`} href="/teams" onClick={() => { setShow(false) }}>Teams</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/free-players' ? 'active' : ''}`} href="/free-players" onClick={() => { setShow(false) }}>Free players</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/league-rules' ? 'active' : ''}`} href="/league-rules" onClick={() => { setShow(false) }}>League Rules</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/controller-settings' ? 'active' : ''}`} href="/controller-settings" onClick={() => { setShow(false) }}>Controller Settings</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/build-your-pro-gk' ? 'active' : ''}`} href="/build-your-pro-gk" onClick={() => { setShow(false) }}>Build your pro</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>;
}