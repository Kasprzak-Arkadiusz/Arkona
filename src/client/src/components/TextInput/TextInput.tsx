import React from 'react';
import * as style from "./styled"
import {Path, UseFormRegister, Validate} from "react-hook-form";
import {Inputs} from "features/register/RegisterForm/RegisterForm"

type InputProps = {
    label: string,
    customName: Path<Inputs>;
    register: UseFormRegister<Inputs>;
    requiredResponse: string;
};

const TextInput = React.forwardRef(({label, customName, register, requiredResponse}: InputProps, ref) => {
    return (
        <style.container>
            <style.label>{label}</style.label>
            <style.input {...register(customName, {required: requiredResponse})} type="text"></style.input>
        </style.container>
    )
});

export default TextInput