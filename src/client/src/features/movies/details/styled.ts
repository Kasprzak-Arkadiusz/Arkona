import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;

    padding: 20px;
    height: 100%;
`

export const InfoAndButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const InformationContainer = styled.div`
    width: auto;
    max-width: 360px;
    display: inline-grid;
    margin: 20px 20px 0px 20px;
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

export const ViewSeancesButton = styled.button`
    width: 100px;
    margin: 20px auto;
    border-radius: 10px;
    
    color: ${props => props.theme.Palette.main};
    background-color: ${props => props.theme.Palette.gray};
    
     &:hover {
        -webkit-text-fill-color: ${props => props.theme.Palette.blueBorder};
        -webkit-text-stroke-color: ${props => props.theme.Palette.blueBorder};
        border-color: ${props => props.theme.Palette.blueBorder};
        transition: 500ms; 
    }
`