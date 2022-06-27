import React, {useEffect, useState} from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'
import {UserClient} from "generated/user/user_pb_service";
import {RegisterRequest} from "generated/user/user_pb"
import _ from "lodash";
import {capitalize} from "utils/stringUtils"
import {usePrevious} from "hooks/usePrevious"

interface IForm {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    repeatPassword: string,
}

const initialFormState: IForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
};

const inputLabels: { [key: string]: string } = {
    firstname: "imię",
    lastname: "nazwisko",
    email: "adres e-mail",
    password: "hasło",
    repeatPassword: "potwierdź hasło"
}

function MapToRegisterRequest(formData: IForm): RegisterRequest {
    const request = new RegisterRequest();

    request.setFirstname(formData.firstname);
    request.setLastname(formData.lastname);
    request.setEmail(formData.email);
    request.setPassword(formData.password);

    return request;
}

function GetChangedProperty(current: IForm, previous: IForm): string {
    if (previous === undefined) {
        return "";
    }

    for (let key in current) {
        if (current[key as keyof IForm] !== previous[key as keyof IForm]) {
            return key;
        }
    }

    return "";
}

function RegisterForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(initialFormState);
    let prevFormData = usePrevious(formData);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value});
    };

    useEffect(() => {
        const changedProperty = GetChangedProperty(formData, prevFormData as IForm);

        if (changedProperty === null) {
            return;
        }

        if (changedProperty !== "password" && changedProperty !== "repeatPassword") {
            if (formData[changedProperty as keyof IForm] === "") {
                setError({...error, [changedProperty]: `Pole ${inputLabels[changedProperty]} jest wymagane`})
            } else {
                setError({...error, [changedProperty]: ""})
            }
            return;
        }

        if (formData.password === formData.repeatPassword) {
            if (formData.password === "") {
                setError({
                    ...error,
                    password: `Pole ${inputLabels["password"]} jest wymagane`,
                    repeatPassword: `Pole ${inputLabels["repeatPassword"]} jest wymagane`
                });
            } else {
                setError({...error, password: "", repeatPassword: ""});
            }
        } else {
            let passwordErrorMessage = "Hasła są różne";
            setError({...error, password: passwordErrorMessage, repeatPassword: passwordErrorMessage});
        }

    }, [formData]);

    const handleSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!_.isEqual(error, initialFormState)) {
            return;
        }

        const userClient = new UserClient(process.env.REACT_APP_SERVER_URL!);
        const request = MapToRegisterRequest(formData);

        userClient.register(request, (error, responseMessage) => {
        });
    }

    return (
        <form.Container>
            <TextInput label={`${capitalize(inputLabels["firstname"])}:`}
                       name={"firstname"}
                       handleChange={handleChange}
                       validationText={error.firstname}/>
            <TextInput label={`${capitalize(inputLabels["lastname"])}:`}
                       name={"lastname"}
                       handleChange={handleChange}
                       validationText={error.lastname}/>
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       name={"email"}
                       handleChange={handleChange}
                       validationText={error.email}/>
            <PasswordInput label={`${capitalize(inputLabels["password"])}:`}
                           name={"password"}
                           handleChange={handleChange}
                           validationText={error.password}/>
            <PasswordInput label={`${capitalize(inputLabels["repeatPassword"])}:`}
                           name={"repeatPassword"}
                           handleChange={handleChange}
                           validationText={error.repeatPassword}/>
            <form.Button type="submit" onClick={handleSubmitButtonClick}>
                Utwórz konto
            </form.Button>
        </form.Container>
    )
}

export default RegisterForm