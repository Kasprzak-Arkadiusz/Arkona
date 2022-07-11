import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

export const Header = styled.header`
    max-width: 1024px;
`

export const HeaderContent = styled.div`
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

export const LogoTitle = styled.div`
    margin-left: auto;
    line-height: 60px;

    font-weight: 400;
    font-size: 32px;

    -webkit-text-fill-color: ${props => props.theme.Palette.textMain};
    -webkit-text-stroke-color: ${props => props.theme.Palette.blueBorder};
    -webkit-text-stroke-width: 1px;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 1);
`

export const HomeLink = styled(Link)`
    width: 180px;
    min-width: 180px;
    margin-right: 10px;
    display: inherit;
    position: relative;
    
    text-decoration: none;
`

export const NavLink = styled(Link)`
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

export const SignOut = styled.button`
    margin: 0 10px 0 10px;
    white-space: nowrap;

    font-family: ${props => props.theme.Fonts.smart};
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    
    background: none;
    border: none;

    -webkit-text-fill-color: ${props => props.theme.Palette.textMain};
    -webkit-text-stroke-color: ${props => props.theme.Palette.blueBorder};
    -webkit-text-stroke-width: 1px;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`

export const Li = styled.li`
    @media only screen and (max-width: 840px) {
        height: 50px;
        display: flex;
        margin: 0 10px 0 10px;
        justify-content: center;
        align-items: center;
    
        background-color:  ${props => props.theme.Palette.darker};
    }
`

export const NavLinks = styled.ul`
    width: 100%;
    display: flex;
    padding-left: 0;
    list-style-type: none;
    
    @media only screen and (max-width: 840px) { 
        flex-direction: column;
        margin: 0px;
    }
`

export const NavIcon = styled.div`
    display: none;
    cursor: pointer;
    
    @media only screen and (max-width: 840px) {
        display: flex;
        margin: 14px 20px 14px auto;
        
        font-size: 32px;

        color: ${props => props.theme.Palette.textMain};
    }
`

interface IProps {
    isOpened: boolean
}

export const NavLinksContainer = styled.div<IProps>`
    display: flex;
    width: 100%;
    left: 0px;
    
     @media only screen and (max-width: 840px) { 
        position: absolute;
        display:block;
        top: -100%;
        margin-top: 10px;
        transition: 1s all;   
         ${({isOpened}) =>
        isOpened && css`
                top: 80px;
                `
        }
    }
`