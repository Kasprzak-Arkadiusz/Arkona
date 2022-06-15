import React from 'react';
import { useState } from 'react';
import { PasswordHiddenIcon } from './PasswordHiddenIcon';
import { PasswordShownIcon } from './PasswordShownIcon';
import * as style from  './styled'

interface IProps {
    validationText?: string,
    label: string
}

const PasswordInput = ({validationText,  label} : IProps) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <style.container>
            <style.validationText>{validationText}</style.validationText>
            <style.label>{label}</style.label>
            <style.input
                type={passwordShown ? 'text' : 'password'}
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
