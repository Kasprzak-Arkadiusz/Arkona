﻿import React, {ReactElement, useState} from 'react';
import * as style from "./styled"

interface IProps {
    validationText: string[],
    label: string,
    name: string,
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({validationText, label, name, handleChange}: IProps) => {

    const renderValidationText = () => {
        return <style.validationText>
            {validationText.map((item: string): ReactElement => {
                return <li key={item}>{item}</li>
            })}
        </style.validationText>;
    }
    
    return (
        <style.container>
            {renderValidationText()}
            <style.label>{label}</style.label>
            <style.input name={name} type="text" onChange={handleChange}></style.input>
        </style.container>
    )
};

export default TextInput