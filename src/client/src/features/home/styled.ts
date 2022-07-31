import styled from "styled-components";
import {Link} from "react-router-dom";

export const filmsContainer = styled.section`
    min-height: 70px;
    margin: 40px 12px 0 12px;

    background-color: ${props => props.theme.Palette.main};
    border-radius: 50px;
`

export const filmListContainer = styled.div`
    min-height: 384px;
    display: flex;
    flex-wrap: wrap;    
`

export const seeMoreContainer = styled.div `
    height: 50px;
    text-align: center;

    border-top-style: solid;
    border-top-color: ${props => props.theme.Palette.rootBackground};
    border-top-width: 5px;
`

export const seeMoreLink = styled(Link)`
     width: 100px;
    height: 50px;
    margin: 0 60px 0 auto;
    display: flex;

    line-height: 14px;
    align-items: center;
    justify-content: center;

    text-align: center;
    text-decoration: none;
    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 200;
    font-size: 12px;

    color: ${props => props.theme.Palette.textMain};
`

export const offersContainer = styled.section`
    min-height: 70px;
    margin: 40px 12px 40px 12px;

    background-color: ${props => props.theme.Palette.main};
    border-radius: 50px;

    text-align: center;
`

 export const offerListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`