import styled from "styled-components";

export const Container = styled.a`
    width: 240px;
    height: 240px;
    margin: 20px auto 20px;
    line-height: 20px;
    position: relative;

    border-radius: 5px;
`

export const Image = styled.img`
    width: inherit;
    height: inherit;
`

export const Text = styled.span`
    width: 220px;
    position: absolute;
    left: 50%;
    top: 90%;
    padding: 0 10px 10px 10px;
    transform: translate(-50%, -50%);

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 0px 0px 4px rgba(0, 0, 0);   
`