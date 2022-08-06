import styled from "styled-components";

interface Props {
    minHeight?: number,
    margin?: string
}

export const Container = styled.section<Props>`
    min-height: ${props => props.minHeight ? props.minHeight : "70px"};
    margin: ${props => props.margin ? props.margin : "40px 12px 0 12px"};

    background-color: ${props => props.theme.Palette.main};
    border-radius: 50px;
`