import React from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";

function RegisterForm() {
    return (
        <form.Container>
            <form.ValidationText>Adres e-mail jest wymagany!</form.ValidationText>
            <form.Label>Adres e-mail:</form.Label>
            <form.Input type="text"/>

            <form.ValidationText>Hasło musi mieć minimum 8 znaków, w tym 1 znak specjalny oraz 1 liczbę!</form.ValidationText>
            <PasswordInput inputId="password-input" title="Hasło:"/>

            <form.ValidationText>Hasła są różne!</form.ValidationText>
            <PasswordInput inputId="confirm-password-input" title="Potwierdź hasło:"/>

            <form.Button type="submit">
                Utwórz konto
            </form.Button>
        </form.Container>
    )
}

export default RegisterForm