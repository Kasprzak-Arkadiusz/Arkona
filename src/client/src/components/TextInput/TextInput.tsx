import React from 'react';
import * as style from "./styled"
import { Path, UseFormRegister} from "react-hook-form";
import {Inputs} from "features/register/RegisterForm/RegisterForm"

type InputProps = {
    label: string,
    customName: Path<Inputs>;
    register: UseFormRegister<Inputs>;
    required: boolean;
};

const TextInput = React.forwardRef(({label, customName, register, required}: InputProps, ref) => {
    return (
        <style.container>
            <style.label>{label}</style.label>
            <style.input {...register(customName, {required})} type="text"></style.input>
        </style.container>
    )
});

export default TextInput