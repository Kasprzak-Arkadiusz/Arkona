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

interface IProps {
    open: boolean
}


export const NavLinks = styled.ul<IProps>`
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