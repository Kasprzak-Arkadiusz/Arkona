import styled from "styled-components";

export const ContentContainer = styled.div`
    max-width: 480px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: auto;
    padding: 10px;
`

export const SectionTitle = styled.span`
    width: fit-content;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
`

export const ErrorLabel = styled.label`
    margin: 10px;
    
    font-weight: bold;
    color: ${props => props.theme.Palette.warning};
`

export const InformationContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    cursor: default;
`

export const Title = styled.span`
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
`

export const Description = styled.span`
   text-align: left; 
`