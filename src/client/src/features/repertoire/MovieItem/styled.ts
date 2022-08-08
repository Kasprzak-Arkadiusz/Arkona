import styled from "styled-components";
import {Link} from "react-router-dom";

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    padding: 20px;
    height: 100%;
`

export const InformationContainer = styled.div`
    width: auto;
    max-width: 480px;
    display: grid;
    margin: auto;
`

export const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    
    margin: 20px auto 20px auto;
`

export const Title = styled.span`
    font-size: 24px;
    font-weight: bold;
`

export const Property = styled.div`
    margin: 15px;
    
    font-family: ${props => props.theme.Fonts.casual};
`

export const PropertyLabel = styled.label`
    margin: 0 10px 0 auto;
    max-width: 120px;
    
    font-weight: bold;
    font-size: 16px;
    color: ${props => props.theme.Palette.textMain};
`

export const PropertyText = styled.span`
    font-size: 16px;
    margin: auto;
`

export const ViewDetailsLink = styled(Link)`
    width: fit-content;
    height: fit-content;
    margin: 20px auto;

    line-height: 14px;
    text-align: center;
    text-decoration: none;
    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 200;
    font-size: 12px;

    color: ${props => props.theme.Palette.textMain};
`