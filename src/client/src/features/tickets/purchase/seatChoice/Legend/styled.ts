import styled from "styled-components";

export const LegendContainer = styled.div`
    width: auto;
    display: flex;
    margin: auto;
    flex-direction: column;
`

export const Title = styled.span`
    margin: 5px auto;
    font-weight: bold;
`

export const Label = styled.label`
    color: ${props => props.theme.Palette.textMain};
`

export const LegendItemContainer = styled.div`
    display: flex;
`
