import styled from "styled-components";

export const Title = styled.h3`
    margin: auto;
    padding: 15px;
    color: ${props => props.theme.Palette.warning};
`

export const Message = styled.span`
    margin: auto;
    padding: 10px;
`

export const Action = styled.a`
    padding: 10px;
    color: ${props => props.theme.Palette.textMain};
    font-size: 14px;
`