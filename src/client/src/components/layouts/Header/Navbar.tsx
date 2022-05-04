import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FiMenu, FiX} from 'react-icons/fi';
import {Logo} from 'assets/icons/Logo';
import 'assets/Navbar.css';
import styled, {css} from "styled-components";

const Header = styled.header`
    max-width: 1024px;
`

const HeaderContent = styled.div`
    max-width: inherit;
    min-width: 336px;
    height: 60px;
    margin: 20px 12px 0 12px;
    display: flex;

    background-color: ${props => props.theme.Palette.darker};
    border-radius: 25px;
    
    font-family: ${props => props.theme.Fonts.smart};
    font-style: normal;
`

const LogoTitle = styled.div`
    margin-left: auto;
    line-height: 60px;

    font-weight: 400;
    font-size: 32px;

    -webkit-text-fill-color: ${props => props.theme.Palette.textMain};
    -webkit-text-stroke-color: ${props => props.theme.Palette.blueBorder};
    -webkit-text-stroke-width: 1px;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 1);
`

const HomeLink = styled(Link)`
    width: 180px;
    min-width: 180px;
    margin-right: 10px;
    display: inherit;
    position: relative;
    
    text-decoration: none;
`

const NavLink = styled(Link)`
    margin: 0 10px 0 10px;
    white-space: nowrap;

    font-family: ${props => props.theme.Fonts.smart};
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    text-decoration: none;

    -webkit-text-fill-color: ${props => props.theme.Palette.textMain};
    -webkit-text-stroke-color: ${props => props.theme.Palette.blueBorder};
    -webkit-text-stroke-width: 1px;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`

const Li = styled.li`
    @media only screen and (max-width: 840px) {
        height: 50px;
        display: flex;
        margin: 0 10px 0 10px;
        justify-content: center;
        align-items: center;
    
        background-color:  ${props => props.theme.Palette.darker};
    }
`

interface IProps {
    open: boolean
}


const NavLinks = styled.ul<IProps>`
    width: 100%;
    display: flex;
    padding-left: 0;
    list-style-type: none;
    
    @media only screen and (max-width: 840px) { 
        position: absolute;
        top: 80px;
        left: -200%;
        flex-direction: column;
        text-align: center;
        transition: 1s all;   
    
        ${({open}) =>
        open && css`
            left: 0px;
            margin-top: 10px;
            margin-bottom: 10px;
            `
        }
    }
`

const NavIcon = styled.div`
    display: none;
    cursor: pointer;
    
    @media only screen and (max-width: 840px) {
        display: flex;
        margin: 14px 20px 14px auto;

        font-size: 32px;

        color: #fafafa;
    }
`


function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <Header>
            <HeaderContent>
                <HomeLink to="/">
                    <Logo/>
                    <LogoTitle>Arkona</LogoTitle>
                </HomeLink>
                <NavLinks open={open}>
                    <Li id="first-link">
                        <NavLink to="/repertoire" onClick={() => setOpen(false)}>
                            Repertuar
                        </NavLink>
                    </Li>
                    <Li>
                        <NavLink to="/offers" onClick={() => setOpen(false)}>
                            Promocje
                        </NavLink>
                    </Li>
                    <Li>
                        <NavLink to="/tickets" onClick={() => setOpen(false)}>
                            Bilety
                        </NavLink>
                    </Li>
                    <Li id="login-link">
                        <NavLink to="/login" onClick={() => setOpen(false)}>
                            Zaloguj
                        </NavLink>
                    </Li>
                    <Li id="register-link">
                        <NavLink to="/register" onClick={() => setOpen(false)}>
                            Zarejestruj
                        </NavLink>
                    </Li>
                </NavLinks>
                <NavIcon onClick={() => setOpen(!open)}>
                    {open ? <FiX/> : <FiMenu/>}
                </NavIcon>
            </HeaderContent>
        </Header>
    );
}

export default Navbar;
