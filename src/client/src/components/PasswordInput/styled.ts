import styled from "styled-components";

export const container = styled.div`
    height: 50px;
`

export const label = styled.label`
    height: 20px;
    display: block;
    margin-top: 5px;

    font-size: 14px;
    line-height: 16px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const input = styled.input`
    width: calc(100% - 60px);
    height: 30px;
    display: inherit;
    margin: 0 auto 5px auto;
    border: 0;
    border-radius: 15px;
    padding: 0 25px 0 15px;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
    background: #c4c4c4;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const iconContainer = styled.div`
    display: inline-block;
    top: -32px;
    position: relative;
    transform: translateX(140px);
    cursor: pointer;
`