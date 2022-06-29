import React, {useState} from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'
import {capitalize, Dictionary, toDictionary} from "utils/stringUtils"
import useAuth from "hooks/useAuth/useAuth";
import {useForm, SubmitHandler} from "react-hook-form";

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
    const [serverErrors, setServerError] = useState(() => {
        let dictionary = new Dictionary<string[]>();
        dictionary.values["firstname"] = [];
        dictionary.values["lastname"] = [];
        dictionary.values["email"] = [];
        dictionary.values["password"] = [];

        return dictionary;
    });

    const auth = useAuth();
    const {register, setError, clearErrors, getValues, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: 'onSubmit'});
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        // auth.signUp(data, (error, responseMessage) => {
        //     if (error !== null) {
        //         const errorDictionary = toDictionary(error.message)
        //         for (let key in errorDictionary.values) {
        //             console.log(key);
        //             console.log(errorDictionary);
        //             errorDictionary.values[key].forEach((item) => {
        //                 console.log(item);
        //                 serverErrors.values[key].push(item);
        //                 console.log(serverErrors);
        //             });
        //         }
        //         console.log(serverErrors);
        //     }
        // });
    };
    
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

    const validatePassword = (password: string): string => {
        if (password == watch("repeatPassword")) {
            return "Hasła są różne";
        }

        return "";
    }

    const validateRepeatPassword = (repeatPassword: string): string => {
        if (repeatPassword !== watch("password")) {
            return "Hasła są różne";
        }

        return "";
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
    
    return (
        <form.Container onSubmit={handleSubmit(onSubmit)}>
            {errors.firstname &&
                <form.validationText>{`Pole ${inputLabels["firstname"]} jest wymagane`}</form.validationText>}
            <TextInput label={`${capitalize(inputLabels["firstname"])}:`}
                       customName="firstname"
                       register={register} required={true}/>
            {errors.lastname &&
                <form.validationText>{`Pole ${inputLabels["lastname"]} jest wymagane`}</form.validationText>}
            <TextInput label={`${capitalize(inputLabels["lastname"])}:`}
                       customName="lastname"
                       register={register} required/>
            {errors.email &&
                <form.validationText>{`Pole ${inputLabels["email"]} jest wymagane`}</form.validationText>}
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       customName="email"
                       register={register} required/>
            {errors.password && errors.password.type !== "custom" &&
                <form.validationText>{errors.password.message}</form.validationText>}
            <PasswordInput label={`${capitalize(inputLabels["password"])}:`}
                           customName="password"
                           onChange={handlePasswordChange}
                           register={register}
                           requiredResponse={`Pole ${inputLabels["password"]} jest wymagane`}
                           validateFunction={value => value === getValues("repeatPassword") || 'Hasła są różne' }/>
            {errors.repeatPassword && errors.repeatPassword.type !== "custom" &&
                <form.validationText>{errors.repeatPassword.message}</form.validationText>}
            <PasswordInput label={`${capitalize(inputLabels["repeatPassword"])}:`}
                           customName="repeatPassword"
                           onChange={handleRepeatPasswordChange}
                           register={register}
                           requiredResponse={`Pole ${inputLabels["repeatPassword"]} jest wymagane`}
                           validateFunction={value => value === getValues("password") || 'Hasła są różne' }/>
            <form.SubmitButton type="submit" value={"Utwórz konto"}>
            </form.SubmitButton>
        </form.Container>
    )
}

export default RegisterForm