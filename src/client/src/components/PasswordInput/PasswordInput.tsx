import React from 'react';
import * as style from 'assets/styles/formStyle'

import {useState} from 'react';
import {PasswordHiddenIcon} from './PasswordHiddenIcon';
import {PasswordShownIcon} from './PasswordShownIcon';
import {Path, UseFormRegister, Validate} from "react-hook-form";
import {Inputs} from "features/register/RegisterForm/RegisterForm";

type InputProps = {
    label: string,
    customName: Path<Inputs>;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    register: UseFormRegister<Inputs>;
    requiredResponse: string;
    validateFunction?: Validate<string>;
};

const PasswordInput = React.forwardRef(({label, customName, onChange, register, requiredResponse, validateFunction}: InputProps, ref) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    
    return (
        <style.InputContainer>
            <style.Label>{label}</style.Label>
            <style.PasswordInput
                {...register(customName, {required: requiredResponse, validate: validateFunction})}
                type={passwordShown ? 'text' : 'password'}
                onChange={onChange}
            />
            <style.IconContainer onClick={togglePassword}>
                {passwordShown ? (
                    <PasswordShownIcon/>
                ) : (
                    <PasswordHiddenIcon/>
                )}
            </style.IconContainer>
        </style.InputContainer>
    );
});

export default PasswordInput;
