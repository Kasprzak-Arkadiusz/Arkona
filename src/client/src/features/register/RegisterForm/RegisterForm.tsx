import React, {useEffect, useState} from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'
import _ from "lodash";
import {capitalize, Dictionary, toDictionary} from "utils/stringUtils"
import {usePrevious} from "hooks/usePrevious"
import useAuth from "hooks/useAuth/useAuth";

export interface IForm {
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

function GetChangedProperty(current: IForm, previous: IForm): string | null {
    if (previous === undefined) {
        return null;
    }

    for (let key in current) {
        if (current[key as keyof IForm] !== previous[key as keyof IForm]) {
            return key;
        }
    }

    return null;
}

function RegisterForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [clientErrors, setClientError] = useState(initialFormState);
    const [errors, setError] = useState(() => {
        let dictionary = new Dictionary<string[]>();
        dictionary.values["firstname"] = [];
        dictionary.values["lastname"] = [];
        dictionary.values["email"] = [];
        dictionary.values["password"] = [];

        return dictionary;
    });
    let prevFormData = usePrevious(formData);
    const auth = useAuth();

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
                setClientError({
                    ...clientErrors,
                    [changedProperty]: `Pole ${inputLabels[changedProperty]} jest wymagane`
                })
            } else {
                setClientError({...clientErrors, [changedProperty]: ""})
            }
            return;
        }

        if (formData.password === formData.repeatPassword) {
            if (formData.password === "") {
                setClientError({
                    ...clientErrors,
                    password: `Pole ${inputLabels["password"]} jest wymagane`,
                    repeatPassword: `Pole ${inputLabels["repeatPassword"]} jest wymagane`
                });
            } else {
                setClientError({...clientErrors, password: "", repeatPassword: ""});
            }
        } else {
            let passwordErrorMessage = "Hasła są różne";
            setClientError({...clientErrors, password: passwordErrorMessage, repeatPassword: passwordErrorMessage});
        }

    }, [formData]);

    const cleanLabels = () => {
        for (let key in errors.values) {
            if (errors.values[key].length !== 0) {
                errors.values[key] = [];
            }
        }
    };

    const handleSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!_.isEqual(clientErrors, initialFormState)) {
            return;
        }

        // Clean validation labels
        cleanLabels();
        console.log(errors);
        
        auth.signUp(formData, (error, responseMessage) => {
            if (error !== null) {
                const errorDictionary = toDictionary(error.message)
                for (let key in errorDictionary.values) {
                    errorDictionary.values[key].forEach((item) => {
                        setError(() => {
                            errors.values[key].push(item);
                            return errors;
                        });
                    });
                }
            }
        });
        
        console.log(clientErrors);
        console.log(errors);
    }

    return (
        <form.Container>
            <TextInput label={`${capitalize(inputLabels["firstname"])}:`}
                       name={"firstname"}
                       handleChange={handleChange}
                       validationText={clientErrors.firstname.length !== 0 
                           ? [clientErrors.firstname] 
                           : errors.values["firstname"]}/>
            <TextInput label={`${capitalize(inputLabels["lastname"])}:`}
                       name={"lastname"}
                       handleChange={handleChange}
                       validationText={clientErrors.lastname.length !== 0
                           ? [clientErrors.lastname]
                           : errors.values["lastname"]}/>
            <TextInput label={`${capitalize(inputLabels["email"])}:`}
                       name={"email"}
                       handleChange={handleChange}
                       validationText={clientErrors.email.length !== 0
                           ? [clientErrors.email]
                           : errors.values["email"]}/>
            <PasswordInput label={`${capitalize(inputLabels["password"])}:`}
                           name={"password"}
                           handleChange={handleChange}
                           validationText={clientErrors.password.length !== 0
                               ? [clientErrors.password]
                               : errors.values["password"]}/>
            <PasswordInput label={`${capitalize(inputLabels["repeatPassword"])}:`}
                           name={"repeatPassword"}
                           handleChange={handleChange}
                           validationText={[clientErrors.repeatPassword]}/>
            <form.Button type="submit" onClick={handleSubmitButtonClick}>
                Utwórz konto
            </form.Button>
        </form.Container>
    )
}

export default RegisterForm