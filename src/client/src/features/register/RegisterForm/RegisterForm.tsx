import React from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'

function RegisterForm() {
    return (
        <form.Container>
            <TextInput label={"Imię:"}></TextInput>
            <TextInput label={"Nazwisko:"}></TextInput>
            <TextInput label={"Adres e-mail:"}></TextInput>
            <PasswordInput label="Hasło:"/>
            <PasswordInput label="Potwierdź hasło:"/>
            <form.Button type="submit">
                Utwórz konto
            </form.Button>
        </form.Container>
    )
}

export default RegisterForm