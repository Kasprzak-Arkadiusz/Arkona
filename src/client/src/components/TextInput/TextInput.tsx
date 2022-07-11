import React from 'react';
import * as style from "assets/styles/formStyle"
import {Path, UseFormRegister} from "react-hook-form";
import {Inputs} from "features/register/RegisterForm/RegisterForm"

type InputProps = {
    label: string,
    customName: Path<Inputs>;
    register: UseFormRegister<Inputs>;
    requiredResponse: string;
};

const TextInput = React.forwardRef(({label, customName, register, requiredResponse}: InputProps, ref) => {
    return (
        <style.InputContainer>
            <style.Label>{label}</style.Label>
            <style.Input {...register(customName, {required: requiredResponse})} type="text"/>
        </style.InputContainer>
    )
});

export default TextInput