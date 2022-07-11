import * as form from "features/register/RegisterForm/styled";
import TextInput from "components/TextInput/TextInput";
import {capitalize} from "utils/stringUtils";
import PasswordInput from "components/PasswordInput/PasswordInput";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useAuth from "hooks/useAuth/useAuth";
import {useNavigate} from "react-router-dom";
import {Inputs} from "features/register/RegisterForm/RegisterForm";

const inputLabels: { [key: string]: string } = {
    email: "adres e-mail",
    password: "hasło"
}

function LoginForm() {
    const navigate = useNavigate();
    const auth = useAuth();
    const {
        register,
        setError,
        clearErrors,
        getValues,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({mode: "all", criteriaMode: "all"});
    const [generalError, setGeneralError] = useState("");

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form submitted");
    };
    
    return (
        <form.Container onSubmit={handleSubmit(onSubmit)}>
            <form.ValidationText key={"generalError"}>{generalError}</form.ValidationText>
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       customName="email"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["email"]} jest wymagane`}/>
            <PasswordInput label={`${capitalize(inputLabels["password"])}:`}
                           customName="password"
                           register={register}
                           requiredResponse={`Pole ${inputLabels["password"]} jest wymagane`}/>
            <form.SubmitButton type="submit" value={"Utwórz konto"}>
            </form.SubmitButton>
        </form.Container>
    )
}

export default LoginForm;