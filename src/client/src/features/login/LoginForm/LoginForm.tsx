import React, {useState} from "react";
import * as form from "assets/styles/formStyle";

import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import TextInput from "components/TextInput/TextInput";
import ValidationTexts from "components/ValidationTexts/ValidationTexts";
import PasswordInput from "components/PasswordInput/PasswordInput";
import useAuth from "hooks/useAuth/useAuth";
import {capitalize} from "utils/stringUtils";
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
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({mode: "all", criteriaMode: "all"});
    const [generalError, setGeneralError] = useState("");

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form submitted with data:");
        console.log(data);
    };
    
    return (
        <form.Container onSubmit={handleSubmit(onSubmit)}>
            <form.ValidationText key={"generalError"}>{generalError}</form.ValidationText>
            <ValidationTexts errors={errors.email}/>
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       customName="email"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["email"]} jest wymagane`}/>
            <ValidationTexts errors={errors.password}/>
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