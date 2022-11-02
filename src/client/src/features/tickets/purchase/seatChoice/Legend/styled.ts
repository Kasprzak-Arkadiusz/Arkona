import styled from "styled-components";

export const LegendContainer = styled.div`
    width: auto;
    max-width: 160px;
    display: flex;
    margin: auto;
    flex-direction: column;
`

export const Title = styled.span`
    margin: 5px auto;
    font-weight: bold;
`

export const Dash = styled.label`
    color: ${props => props.theme.Palette.textMain};
    padding: 0px 2px;
`

export const Label = styled.label`
    margin-left: 5px;
    text-align: left;
    color: ${props => props.theme.Palette.textMain};
`

export const LegendItemContainer = styled.div`
    display: flex;
`
