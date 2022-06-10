import styled from "styled-components";

export const Container = styled.form`
    width: 340px;
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

export const Label = styled.label`
    height: 20px;
    display: block;
    margin-top: 5px;

    font-size: 14px;
    line-height: 16px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const Input = styled.input`
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
    background: ${props => props.theme.Palette.gray};
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const Button = styled.button`
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
`