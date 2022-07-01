import React, {useEffect, useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {Logo} from 'assets/icons/Logo/Logo';
import './navbar.css';
import * as navbar from "./styled"
import {Role} from "utils/CustomTypes/Role";
import useAuth from "hooks/useAuth/useAuth";
import {ValidateToken} from "hooks/useAuth/JwtTokenMethods";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        
    }, [open]);

    const role = auth.authData?.role;

    const getClientNavLinks = (): JSX.Element => {
        return (
            <navbar.NavLinks>
                <navbar.Li id="first-link">
                    <navbar.NavLink to="/client/repertoire" onClick={() => setOpen(false)}>
                        Repertuar
                    </navbar.NavLink>
                </navbar.Li>
                <navbar.Li>
                    <navbar.NavLink to="/client/offers" onClick={() => setOpen(false)}>
                        Promocje
                    </navbar.NavLink>
                </navbar.Li>
                <navbar.Li>
                    <navbar.NavLink to="/client/tickets" onClick={() => setOpen(false)}>
                        Bilety
                    </navbar.NavLink>
                </navbar.Li>
            </navbar.NavLinks>
        )
    }

    const getWorkerNavLinks = (): JSX.Element => {
        return (
            <navbar.NavLinks>
                <navbar.Li id="first-link">
                    <navbar.NavLink to="/worker/repertoire" onClick={() => setOpen(false)}>
                        Repertuar
                    </navbar.NavLink>
                </navbar.Li>
                <navbar.Li>
                    <navbar.NavLink to="/worker/offers" onClick={() => setOpen(false)}>
                        Promocje
                    </navbar.NavLink>
                </navbar.Li>
                <navbar.Li>
                    <navbar.NavLink to="/worker/tickets" onClick={() => setOpen(false)}>
                        Bilety
                    </navbar.NavLink>
                </navbar.Li>
            </navbar.NavLinks>
        )
    }

    const getDefaultNavLinks = (): JSX.Element => {
        return (
            <navbar.NavLinks>
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
        )
    }

    return (
        <navbar.Header>
            <navbar.HeaderContent>
                <navbar.HomeLink to="/">
                    <Logo/>
                    <navbar.LogoTitle>Arkona</navbar.LogoTitle>
                </navbar.HomeLink>
                <navbar.NavLinksContainer isOpened={open}>
                    {
                        ValidateToken(role ?? "") && (
                            role === Role.client && getClientNavLinks() ||
                            role === Role.worker && getWorkerNavLinks())}
                    {getDefaultNavLinks()}
                </navbar.NavLinksContainer>
                <navbar.NavIcon onClick={() => setOpen(!open)}>
                    {open ? <FiX/> : <FiMenu/>}
                </navbar.NavIcon>
            </navbar.HeaderContent>
        </navbar.Header>
    );
}

export default Navbar;
