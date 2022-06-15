import React from 'react';
import * as style from "./styled"

interface IProps {
    validationText?: string,
    label: string,
    name: string,
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({validationText,  label, name, handleChange} : IProps) => {
    return (
        <style.container>
            <style.validationText>{validationText}</style.validationText>
            <style.label>{label}</style.label>
            <style.input name={name} type="text" onChange={handleChange}></style.input>
        </style.container>
    )
};

export default TextInput