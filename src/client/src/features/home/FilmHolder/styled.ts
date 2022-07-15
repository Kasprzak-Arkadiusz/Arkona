import styled from "styled-components";

export const Container = styled.div`
    width: 220px;
    max-width: 220px;
    height: auto;
    line-height: 20px;
    margin: 20px auto 10px;
`

export const Image = styled.img`
    width: inherit;
    height: 320px;
`

export const Title = styled.a`
    height: auto;
    max-width: inherit;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    word-wrap: break-word;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2);
`

export const TitleContainer = styled.div`
    width: inherit;
    height: auto;
    margin: 5px 0 5px 0;
    max-width: inherit;

    display: flex;
    text-align: center;
    justify-content: center;
`