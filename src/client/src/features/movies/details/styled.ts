import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;

    padding: 20px;
    height: 100%;
`

export const InformationContainer = styled.div`
    width: auto;
    max-width: 360px;
    display: inline-grid;
    margin: 20px;
`

export const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    
    margin: auto;
`

export const Title = styled.span`
    font-size: 32px;
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