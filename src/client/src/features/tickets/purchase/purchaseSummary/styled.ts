import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 12px;
`

export const SummaryHeader = styled.h2`
    font-family: ${props => props.theme.Fonts.casual};
    color: ${props => props.theme.Palette.textMain};
`

export const SummaryContainer = styled.div`
    width: auto;
    height: auto;
    margin: 0px 20px;
    
    border: 2px solid ${props => props.theme.Palette.textMain};
    box-shadow: 1px 1px 24px 0px rgb(80,80,80);
    border-radius: 25px;
`

export const SectionContainer = styled.div`
    width: auto;
    height: auto;
    margin: 20px;
    padding: 5px;
    
    border: 1px solid ${props => props.theme.Palette.textMain};
    border-radius: 25px;
    background-color: ${props => props.theme.Palette.bluish}
`

export const SectionTitle = styled.span`
    margin: 10px auto;
    font-size: 18px;
    font-weight: bold;
`

interface Props {
    textAlign?: string
}

export const SectionDetailsContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: auto;
    text-align: ${props => props.textAlign === undefined ? "right" : props.textAlign};
    word-wrap: break-word;
`

export const DetailContainer = styled.div`
    margin: 5px;
`

export const DetailsLabel = styled.label`
    margin: 0px 5px 0px auto;
    font-size: 14px;
    font-family: ${props => props.theme.Fonts.casual};
    font-weight: bold;
    color: ${props => props.theme.Palette.textMain};
`

export const DetailsText = styled.span``

export const ErrorMessage = styled.span`
    margin-bottom: 20px;
    color: ${props => props.theme.Palette.warning};
`