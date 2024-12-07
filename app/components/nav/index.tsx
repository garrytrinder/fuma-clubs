'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import './nav.scss';

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/league-rules", label: "League Rules" },
    { href: "/controller-settings", label: "Controller Settings" },
  ];

  return (
    <nav className="navbar bg-primary sticky-top">
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
              {navLinks.map(link => (
                <NavLink key={link.href} href={link.href} label={link.label} onClick={() => { setShow(false) }} />
              ))}
              <hr />
              <h5 className="offcanvas-title">Season Two</h5>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/tournament/1' ? 'active' : ''}`} href="/tournament/1" onClick={() => { setShow(false) }}>Table</Link>
              </li>
              <hr />
              <h5 className="offcanvas-title">Season One</h5>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/season-one/table' ? 'active' : ''}`} href="/season-one/table" onClick={() => { setShow(false) }}>Table</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/season-one/scores-fixtures' ? 'active' : ''}`} href="/season-one/scores-fixtures" onClick={() => { setShow(false) }}>Scores &amp; Fixtures</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};