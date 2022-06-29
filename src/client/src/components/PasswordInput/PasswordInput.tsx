import React from 'react';
import {useState} from 'react';
import {PasswordHiddenIcon} from './PasswordHiddenIcon';
import {PasswordShownIcon} from './PasswordShownIcon';
import * as style from './styled'
import {Path, UseFormRegister, Validate} from "react-hook-form";
import {Inputs} from "features/register/RegisterForm/RegisterForm";

type InputProps = {
    label: string,
    customName: Path<Inputs>;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    register: UseFormRegister<Inputs>;
    requiredResponse: string;
    validateFunction: Validate<string>;
};

const PasswordInput = React.forwardRef(({label, customName, onChange, register, requiredResponse, validateFunction}: InputProps, ref) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    
    return (
        <style.container>
            <style.label>{label}</style.label>
            <style.input
                {...register(customName, {required: requiredResponse, validate: validateFunction})}
                type={passwordShown ? 'text' : 'password'}
                onChange={onChange}
            />
            <style.iconContainer onClick={togglePassword}>
                {passwordShown ? (
                    <PasswordShownIcon/>
                ) : (
                    <PasswordHiddenIcon/>
                )}
            </style.iconContainer>
        </style.container>
    );
});

export default PasswordInput;
