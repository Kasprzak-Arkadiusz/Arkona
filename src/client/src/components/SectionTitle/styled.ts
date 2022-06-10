import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
    
    border-bottom-style: solid;
    border-bottom-color: ${props => props.theme.Palette.rootBackground};
    border-bottom-width: 5px;
`

export const Title = styled.span`
    width: 100px;
    display: inline-block;
    margin: auto 5px auto 0;
    padding-top: 4px;

    font-family: ${props => props.theme.Fonts.smart};
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    color: ${props => props.theme.Palette.textMain};
`