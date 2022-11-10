import styled from "styled-components";

interface Props {
    minHeight?: string,
    margin?: string
}

export const Container = styled.section<Props>`
    display: grid;
    min-height: ${props => props.minHeight ? props.minHeight : "70px"};
    margin: ${props => props.margin ? props.margin : "40px 12px 0 12px"};
    box-shadow: 1px 1px 24px 0px rgb(80, 80, 80);

    background-color: ${props => props.theme.Palette.main};
    border-radius: 50px;
`