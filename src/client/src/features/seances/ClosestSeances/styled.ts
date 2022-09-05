import styled from "styled-components";

export const DayOfWeekContainer = styled.div`
    width: auto;
    display: flex;
    justify-content: center;
`

export const ContentContainer = styled.div`
    margin: 40px 10px;
`

export const LabelContainer = styled.div`
    width: 120px;
    min-width: 120px;
    margin: 0px auto 0px 10%;
    
    @media only screen and (max-width: 480px) {
        margin: 0px auto 0px 10px;
    }
`

export const DayOfWeekLabel = styled.label`
    margin: auto 10px;
    max-width: 100px;
    
    font-weight: bold;
    font-size: 14px;
    color: ${props => props.theme.Palette.textMain};
    font-family: ${props => props.theme.Fonts.casual};
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: auto;
    justify-content: center;
    margin-right: auto;
`

export const SeanceButton = styled.button`
    width: 100px;
    height: 25px;
    margin: 0px 10px 20px 10px;
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

export const NoSeancesAvailableSpan = styled.span`
    padding: 20px;
    display: block;
`