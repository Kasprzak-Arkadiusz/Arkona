import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import * as form from "assets/styles/formStyle";

import {useForm, SubmitHandler, MultipleFieldErrors} from "react-hook-form";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'
import ValidationTexts from "components/ValidationTexts/ValidationTexts";
import useAuth from "hooks/useAuth/useAuth";
import {capitalize, toDictionary} from "utils/stringUtils"
import {ServiceError} from "generated/user/user_pb_service";

const inputLabels: { [key: string]: string } = {
    firstname: "imię",
    lastname: "nazwisko",
    email: "adres e-mail",
    password: "hasło",
    repeatPassword: "potwierdź hasło"
}

export type Inputs = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatPassword: string
};

function RegisterForm() {
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
    const differentPasswordsErrorMessage = "Hasła są różne";
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        auth.signUp(data, (error, responseMessage) => {
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
            case "firstname":
                setError("firstname", {types: errors});
                break;
            case "lastname":
                setError("lastname", {types: errors});
                break;
            case "email":
                setError("email", {types: errors});
                break;
            case "password":
                setError("password", {types: errors});
                break;
            case "repeatPassword":
                setError("repeatPassword", {types: errors});
                break;
        }
    }
    
    const setPasswordsError = (passwordFieldValue: string, repeatPasswordFieldValue:string) => {
        if (passwordFieldValue !== repeatPasswordFieldValue) {
            setError("password", {type: "validate", message: differentPasswordsErrorMessage});
            setError("repeatPassword", {type: "validate", message: differentPasswordsErrorMessage});
        } else {
            clearErrors(["password", "repeatPassword"]);
        }
    }

    const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        const passwordFieldValue = e.currentTarget.value;
        const repeatPasswordFieldValue = getValues("repeatPassword");

        setPasswordsError(passwordFieldValue, repeatPasswordFieldValue);
    }

    const handleRepeatPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        const repeatPasswordFieldValue = e.currentTarget.value;
        const passwordFieldValue = getValues("password");

        setPasswordsError(passwordFieldValue, repeatPasswordFieldValue);
    };

    return (
        <form.Container onSubmit={handleSubmit(onSubmit)}>
            <form.ValidationText key={"generalError"}>{generalError}</form.ValidationText>
            <ValidationTexts errors={errors.firstname}/>
            <TextInput label={`${capitalize(inputLabels["firstname"])}:`}
                       customName="firstname"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["firstname"]} jest wymagane`}/>
            <ValidationTexts errors={errors.lastname}/>
            <TextInput label={`${capitalize(inputLabels["lastname"])}:`}
                       customName="lastname"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["lastname"]} jest wymagane`}/>
            <ValidationTexts errors={errors.email}/>
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       customName="email"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["email"]} jest wymagane`}/>
            <ValidationTexts errors={errors.password}/>
            <PasswordInput label={`${capitalize(inputLabels["password"])}:`}
                           customName="password"
                           onChange={handlePasswordChange}
                           register={register}
                           requiredResponse={`Pole ${inputLabels["password"]} jest wymagane`}
                           validateFunction={value => value === getValues("repeatPassword") || differentPasswordsErrorMessage}/>
            <ValidationTexts errors={errors.repeatPassword}/>
            <PasswordInput label={`${capitalize(inputLabels["repeatPassword"])}:`}
                           customName="repeatPassword"
                           onChange={handleRepeatPasswordChange}
                           register={register}
                           requiredResponse={`Pole ${inputLabels["repeatPassword"]} jest wymagane`}
                           validateFunction={value => value === getValues("password") || differentPasswordsErrorMessage}/>
            <form.SubmitButton type="submit" value={"Utwórz konto"}>
            </form.SubmitButton>
        </form.Container>
    )
}

export default RegisterForm