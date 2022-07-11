import styled from "styled-components";

export const Container = styled.form`
    width: 360px;
    margin: 10px auto auto auto;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
`

export const ValidationText = styled.span`
    display: block;
    margin: auto;
    padding: 5px 10px 5px 10px;

    font-size: 13px;
    line-height: 14px;

    color: ${props => props.theme.Palette.warning};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const SubmitButton = styled.input`
    width: calc(100% / 3);
    height: 30px;
    border-radius: 15px;
    border: 0;
    margin: 20px auto 10px auto;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
    display: inline-block;

    color: ${props => props.theme.Palette.textMain};
    background-color: ${props => props.theme.Palette.gray};
    mix-blend-mode: normal;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
    
    cursor: pointer;
`