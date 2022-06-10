import React from 'react';
import { useState } from 'react';
import { PasswordHiddenIcon } from './PasswordHiddenIcon';
import { PasswordShownIcon } from './PasswordShownIcon';
import * as style from  './styled'

const PasswordInput = (props: { inputId: string; title: string }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <style.container>
            <style.label>{props.title}</style.label>
            <style.input
                type={passwordShown ? 'text' : 'password'}
                id={props.inputId}
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
