import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { Logo } from 'assets/icons/Logo';
import 'assets/Navbar.css';

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <header className="header">
            <Link to="/" className="logo-container text-link">
                <Logo className="logo-container__logo" />
                <span className="logo-container__title">Arkona</span>
            </Link>
            <ul className={open ? 'nav-links-active' : 'nav-links'}>
                <li className="nav-link" id="first-link">
                    <Link to="/repertoire" className="navbar-container__link text-link" onClick={() => setOpen(false)}>
                        Repertuar
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to="/offers" className="navbar-container__link text-link" onClick={() => setOpen(false)}>
                        Promocje
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to="/tickets" className="navbar-container__link text-link" onClick={() => setOpen(false)}>
                        Bilety
                    </Link>
                </li>
                <li className="nav-link" id="login-link">
                    <Link to="/login" className="account-container__link text-link" onClick={() => setOpen(false)}>
                        Zaloguj
                    </Link>
                </li>
                <li className="nav-link" id="register-link">
                    <Link to="/register" className="account-container__link text-link" onClick={() => setOpen(false)}>
                        Zarejestruj
                    </Link>
                </li>
            </ul>
            <div onClick={() => setOpen(!open)} className="nav-icon">
                {open ? <FiX /> : <FiMenu />}
            </div>
        </header>
    );
}

export default Navbar;
