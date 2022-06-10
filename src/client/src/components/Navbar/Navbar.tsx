import React, {useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {Logo} from 'assets/icons/Logo/Logo';
import './navbar.css';
import * as navbar from "./styled"

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <navbar.Header>
            <navbar.HeaderContent>
                <navbar.HomeLink to="/">
                    <Logo/>
                    <navbar.LogoTitle>Arkona</navbar.LogoTitle>
                </navbar.HomeLink>
                <navbar.NavLinks open={open}>
                    <navbar.Li id="first-link">
                        <navbar.NavLink to="/repertoire" onClick={() => setOpen(false)}>
                            Repertuar
                        </navbar.NavLink>
                    </navbar.Li>
                    <navbar.Li>
                        <navbar.NavLink to="/offers" onClick={() => setOpen(false)}>
                            Promocje
                        </navbar.NavLink>
                    </navbar.Li>
                    <navbar.Li>
                        <navbar.NavLink to="/tickets" onClick={() => setOpen(false)}>
                            Bilety
                        </navbar.NavLink>
                    </navbar.Li>
                    <navbar.Li id="login-link">
                        <navbar.NavLink to="/login" onClick={() => setOpen(false)}>
                            Zaloguj
                        </navbar.NavLink>
                    </navbar.Li>
                    <navbar.Li id="register-link">
                        <navbar.NavLink to="/register" onClick={() => setOpen(false)}>
                            Zarejestruj
                        </navbar.NavLink>
                    </navbar.Li>
                </navbar.NavLinks>
                <navbar.NavIcon onClick={() => setOpen(!open)}>
                    {open ? <FiX/> : <FiMenu/>}
                </navbar.NavIcon>
            </navbar.HeaderContent>
        </navbar.Header>
    );
}

export default Navbar;
