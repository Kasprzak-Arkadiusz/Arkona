import React, {useState} from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'
import {capitalize, toDictionary} from "utils/stringUtils"
import useAuth from "hooks/useAuth/useAuth";
import {useForm, SubmitHandler, MultipleFieldErrors, Message, FieldError} from "react-hook-form";

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
            setGeneralError("");
            console.log(error?.message);
            if (error !== null && error.code === 3) {
                const errorDictionary = toDictionary(error.message)
                for (let key in errorDictionary.values) {
                    let errorArray: string[] = [];
                    errorDictionary.values[key].forEach((item) => {
                        errorArray.push(item);
                    });
                    setValidationError(key, errorArray);
                }
            } else if (error !== null) {
                setGeneralError(error.message);
            } else{
                console.log(responseMessage);
            }
        });
    };

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

    const toMultipleValidationTexts = (errors: FieldError | undefined): JSX.Element[] | undefined => {
        if (errors === undefined || errors.types === undefined) {
            return undefined;
        }
        
        let errorArray: JSX.Element[] = [];

        if (errors.types.required) {
            errorArray.push(<form.ValidationText key={"requiredField"}>{errors.types.required}</form.ValidationText>)
            return errorArray;
        }

        if (typeof (errors.types?.validate) === "string") {
            errorArray.push(<form.ValidationText key={"singleValidate"}>{errors.types.validate}</form.ValidationText>)
            return errorArray;
        }

        let messageArray = errors.types?.validate as Message[];
        errorArray = messageArray.map((item, index) => {
            return <form.ValidationText key={index}>{item}</form.ValidationText>
        })

        return errorArray;
    }

    return (
        <form.Container onSubmit={handleSubmit(onSubmit)}>
            <form.ValidationText key={"generalError"}>{generalError}</form.ValidationText>
            {toMultipleValidationTexts(errors.firstname)}
            <TextInput label={`${capitalize(inputLabels["firstname"])}:`}
                       customName="firstname"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["firstname"]} jest wymagane`}/>
            {toMultipleValidationTexts(errors.lastname)}
            <TextInput label={`${capitalize(inputLabels["lastname"])}:`}
                       customName="lastname"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["lastname"]} jest wymagane`}/>
            {toMultipleValidationTexts(errors.email)}
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       customName="email"
                       register={register}
                       requiredResponse={`Pole ${inputLabels["email"]} jest wymagane`}/>
            {toMultipleValidationTexts(errors.password)}
            <PasswordInput label={`${capitalize(inputLabels["password"])}:`}
                           customName="password"
                           onChange={handlePasswordChange}
                           register={register}
                           requiredResponse={`Pole ${inputLabels["password"]} jest wymagane`}
                           validateFunction={value => value === getValues("repeatPassword") || differentPasswordsErrorMessage}/>
            {toMultipleValidationTexts(errors.repeatPassword)}
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