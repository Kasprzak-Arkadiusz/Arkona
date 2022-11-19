import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    height: 25px;
    margin: 0 auto 5px 0px;
    border: 0;
    border-radius: 15px;
    text-align: center;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
    background: ${props => props.theme.Palette.gray};
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
`

export const InputContainer = styled.div`
    height: auto;
    width: 320px;
    margin:auto;
    text-align:center;
    display:inline;
`

export const Label = styled.label`
    height: 20px;
    display: block;
    margin-top: 5px;

    font-size: 14px;
    font-family: ${props => props.theme.Fonts.casual};
    line-height: 16px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const DescriptionArea = styled.textarea`
    width: calc(100% - 10px);
    height: 160px;
    resize: none;
    padding: 5px;
    border: 0;

    background: ${props => props.theme.Palette.gray};
    font-size: 14px;
    font-family: ${props => props.theme.Fonts.casual};
    
    color: ${props => props.theme.Palette.textMain};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
`


export const Select = styled.select`
    height: 25px;
    width: 75%;
    margin: auto;
    border: 0;
    border-radius: 15px;
    padding: 0 10px 0 5px;
    text-align: center;

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