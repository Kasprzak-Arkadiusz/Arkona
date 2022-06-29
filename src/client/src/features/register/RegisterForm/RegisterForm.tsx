import React from "react";
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
        watch,
        formState: {errors}
    } = useForm<Inputs>({mode: 'onSubmit', criteriaMode: "all"});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        auth.signUp(data, (error, responseMessage) => {
            if (error !== null) {
                const errorDictionary = toDictionary(error.message)
                for (let key in errorDictionary.values) {
                    let errorArray: string[] = [];
                    errorDictionary.values[key].forEach((item) => {
                        errorArray.push(item);
                    });
                    setErrorByString(key, errorArray);
                }
            }
        });
    };

    const setErrorByString = (text: string, errorMessage: string[]) => {
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

    const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        clearErrors(["password", "repeatPassword"]);

        const passwordFieldValue = e.currentTarget.value;
        const repeatPasswordFieldValue = watch("repeatPassword");

        if (passwordFieldValue !== repeatPasswordFieldValue) {
            setError("password", {type: "validate", message: "Hasła są różne"});
            setError("repeatPassword", {type: "validate", message: "Hasła są różne"});
        } else {
            clearErrors(["password", "repeatPassword"]);
        }
    }

    const handleRepeatPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        clearErrors(["password", "repeatPassword"]);

        const repeatPasswordFieldValue = e.currentTarget.value;
        const passwordFieldValue = watch("password");

        if (passwordFieldValue !== repeatPasswordFieldValue) {
            setError("password", {type: "validate", message: "Hasła są różne"});
            setError("repeatPassword", {type: "validate", message: "Hasła są różne"});
        } else {
            clearErrors(["password", "repeatPassword"]);
        }
    };
    
    const toMultipleValidationTexts = (errors: FieldError | undefined): JSX.Element[] | undefined => {
        if (errors === undefined || errors.types === undefined){
            return undefined;
        }

        let errorArray: JSX.Element[] = [];
        
        if (errors.types.required){
            errorArray.push(<form.ValidationText key={"requiredField"}>{errors.types.required}</form.ValidationText>)
            return errorArray;
        }
        
        if (typeof(errors.types?.validate) === "string")
        {
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
                           validateFunction={value => value === getValues("repeatPassword") || 'Hasła są różne'}/>
            {toMultipleValidationTexts(errors.repeatPassword)}
            <PasswordInput label={`${capitalize(inputLabels["repeatPassword"])}:`}
                           customName="repeatPassword"
                           onChange={handleRepeatPasswordChange}
                           register={register}
                           requiredResponse={`Pole ${inputLabels["repeatPassword"]} jest wymagane`}
                           validateFunction={value => value === getValues("password") || 'Hasła są różne'}/>
            <form.SubmitButton type="submit" value={"Utwórz konto"}>
            </form.SubmitButton>
        </form.Container>
    )
}

export default RegisterForm