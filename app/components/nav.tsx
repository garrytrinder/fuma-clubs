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
        <Image src="menu.svg" alt="Menu toggle" height={30} width={30}></Image>
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
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/table' ? 'active' : ''}`} href="/table" onClick={() => { setShow(false) }}>Table</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/scores-fixtures' ? 'active' : ''}`} href="/scores-fixtures" onClick={() => { setShow(false) }}>Scores &amp; Fixtures</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/teams' ? 'active' : ''}`} href="/teams" onClick={() => { setShow(false) }}>Teams</Link>
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
              <Link className={`nav-link ${pathname === '/build-your-pro' ? 'active' : ''}`} href="/build-your-pro" onClick={() => { setShow(false) }}>Build your pro</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>;
}