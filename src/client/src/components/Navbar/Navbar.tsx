import React, {useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {Logo} from 'assets/icons/Logo/Logo';
import './navbar.css';
import * as navbar from "./styled"
import {Role} from "utils/CustomTypes/Role";
import useAuth from "hooks/useAuth/useAuth";
import RequireAuth from "../../hooks/useAuth/RequireAuth";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const auth = useAuth();
    const role = auth.authData?.role;
    
    const OnNavClick = () => {
        setOpen(false);
    }

    const getClientNavLinks = (): JSX.Element => {
        return (
            <navbar.NavLinks>
                <navbar.Li id="first-link">
                    <navbar.NavLink to="/client/tickets" onClick={OnNavClick}>
                        Bilety
                    </navbar.NavLink>
                </navbar.Li>
            </navbar.NavLinks>
        )
    }

    const getAuthenticationNavLinks = (): JSX.Element => {
        if (role === undefined) {
            return (
                <navbar.DefaultNavLinks>
                    <navbar.Li id="login-link">
                        <navbar.NavLink to="/login" onClick={OnNavClick}>
                            Zaloguj
                        </navbar.NavLink>
                    </navbar.Li>
                    <navbar.Li id="register-link">
                        <navbar.NavLink to="/register" onClick={OnNavClick}>
                            Zarejestruj
                        </navbar.NavLink>
                    </navbar.Li>
                </navbar.DefaultNavLinks>
            )
        } else {
            return (
                <navbar.DefaultNavLinks>
                    <navbar.Li id="register-link">
                        <navbar.SignOut onClick={() => auth.signOut()}>
                            Wyloguj
                        </navbar.SignOut>
                    </navbar.Li>
                </navbar.DefaultNavLinks>
            )
        }
    }
    
    const getDefaultNavLinks = () : JSX.Element => {
        return (
            <navbar.DefaultNavLinks>
                <navbar.Li id="first-link">
                    <navbar.NavLink to="/repertoire" onClick={OnNavClick}>
                        Repertuar
                    </navbar.NavLink>
                </navbar.Li>
                <navbar.Li>
                    <navbar.NavLink to="/offers" onClick={OnNavClick}>
                        Promocje
                    </navbar.NavLink>
                </navbar.Li>
            </navbar.DefaultNavLinks>
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
                    {getDefaultNavLinks()}
                    {
                        <RequireAuth role={role ?? ""}/> && (
                            role === Role.client && getClientNavLinks() ||
                            role === Role.worker)}
                    {getAuthenticationNavLinks()}
                </navbar.NavLinksContainer>
                <navbar.NavIcon onClick={() => setOpen(!open)}>
                    {open ? <FiX/> : <FiMenu/>}
                </navbar.NavIcon>
            </navbar.HeaderContent>
        </navbar.Header>
    );
}

export default Navbar;
