import React from 'react';
import * as style from "./styled"

interface IProps {
    validationText?: string,
    label: string
}

const TextInput = ({validationText,  label} : IProps) => {
    return (
        <style.container>
            <style.validationText>{validationText}</style.validationText>
            <style.label>{label}</style.label>
            <style.input type="text"></style.input>
        </style.container>
    )
};

export default TextInput