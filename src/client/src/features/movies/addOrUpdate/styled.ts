import styled from "styled-components";

export const DisplayContainer = styled.main`
    max-width: 1024px;
    min-width: 360px;
    min-height: 390px;
    margin: auto;
`

export const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const Title = styled.h3`
    color: ${props => props.theme.Palette.textMain};
    font-family: ${props => props.theme.Fonts.casual};
`