import styled from "styled-components";

export const Container = styled.div`
    width: 220px;
    height: 360px;
    line-height: 20px;
    margin: 20px auto 10px;
    vertical-align: top;
`

export const Image = styled.img `
    width: inherit;
    height: 320px;
`

export const Title = styled.span `
    width: inherit;
    height: 40px;
    margin-top: 5px;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    text-align: center;
    justify-content: center;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2);
`