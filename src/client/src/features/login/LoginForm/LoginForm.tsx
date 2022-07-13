import React, {useState} from "react";
import * as form from "assets/styles/formStyle";

import {MultipleFieldErrors, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import TextInput from "components/TextInput/TextInput";
import ValidationTexts from "components/ValidationTexts/ValidationTexts";
import PasswordInput from "components/PasswordInput/PasswordInput";
import useAuth from "hooks/useAuth/useAuth";
import {capitalize, toDictionary} from "utils/stringUtils";
import {Inputs} from "features/register/RegisterForm/RegisterForm";
import {ServiceError} from "generated/user/user_pb_service";

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
        setError,
        formState: {errors}
    } = useForm<Inputs>({mode: "all", criteriaMode: "all"});
    const [generalError, setGeneralError] = useState("");

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        auth.signIn(data, (error, _) => {
            if (error !== null) {
                onError(error);
            } else{
                onSuccess();
            }
        });
    };

    const onError = (error: ServiceError) => {
        setGeneralError("");
        if (error.code === 3) {
            const errorDictionary = toDictionary(error.message)
            for (let key in errorDictionary.values) {
                let errorArray: string[] = [];
                errorDictionary.values[key].forEach((item) => {
                    errorArray.push(item);
                });
                setValidationError(key, errorArray);
            }
        } else {
            setGeneralError(error.message);
        }
    }
    
    const onSuccess = () => {
        navigate("/");
    }

    const setValidationError = (text: string, errorMessage: string[]) => {
        let errors: MultipleFieldErrors | undefined = {
            validate: errorMessage
        }
        switch (text) {
            case "email":
                setError("email", {types: errors});
                break;
            case "password":
                setError("password", {types: errors});
                break;
        }
    }
    
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
            <form.SubmitButton type="submit" value={"Zaloguj się"}>
            </form.SubmitButton>
        </form.Container>
    )
}

export default LoginForm;