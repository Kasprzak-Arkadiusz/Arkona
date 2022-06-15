import React from 'react';
import { useState } from 'react';
import { PasswordHiddenIcon } from './PasswordHiddenIcon';
import { PasswordShownIcon } from './PasswordShownIcon';
import * as style from  './styled'

interface IProps {
    validationText?: string,
    label: string
    name: string,
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput = ({validationText,  label, name, handleChange} : IProps) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <style.container>
            <style.validationText>{validationText}</style.validationText>
            <style.label>{label}</style.label>
            <style.input
                name={name}
                type={passwordShown ? 'text' : 'password'}
                onChange={handleChange}
            />
            <style.iconContainer onClick={togglePassword}>
                {passwordShown ? (
                    <PasswordShownIcon height="24px" width="24px"/>
                ) : (
                    <PasswordHiddenIcon height="24px" width="24px" />
                )}
            </style.iconContainer>
        </style.container>
    );
};

export default PasswordInput;
