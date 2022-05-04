﻿import React from 'react';
import { useState } from 'react';
import { PasswordHiddenIcon } from '../assets/icons/PasswordHiddenIcon';
import { PasswordShownIcon } from '../assets/icons/PasswordShownIcon';

const PasswordInput = (props: { inputId: string; title: string }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="register-form-input-container">
            <label className="register-form-container__label">{props.title}</label>
            <input
                type={passwordShown ? 'text' : 'password'}
                id={props.inputId}
                className="register-form-container_input"
            />
            <div className="register-form-icon-container" onClick={togglePassword}>
                {passwordShown ? (
                    <PasswordShownIcon height="24px" width="24px"/>
                ) : (
                    <PasswordHiddenIcon height="24px" width="24px" />
                )}
            </div>
        </div>
    );
};

export default PasswordInput;
