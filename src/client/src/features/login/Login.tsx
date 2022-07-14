﻿import React from 'react';
import * as login from "assets/styles/authenticationStyle";
import facebook from "assets/images/facebook-logo.png";
import google from "assets/images/google-logo.png";

import SectionTitle from "components/SectionTitle/SectionTitle";
import FacebookExternalLogin from "components/ExternalLogin/FacebookExternalLogin";
import GoogleExternalLogin from "components/ExternalLogin/GoogleExternalLogin";
import LoginForm from "./LoginForm/LoginForm";

function Login() {
    return (
        <main className="display-container">
            <login.container>
                <SectionTitle title="Logowanie"/>
                <LoginForm/>
                <login.externalProviderContainer>
                    <login.text>lub</login.text>
                    <login.text>zaloguj się za pomocą:</login.text>
                    <FacebookExternalLogin imgSource={facebook} providerName="Facebook" buttonText="Facebooka"/>
                    <GoogleExternalLogin imgSource={google} providerName="Google" buttonText="Google"/>
                </login.externalProviderContainer>
                <login.redirectContainer>
                    <login.redirectContainerSpan>Nie masz konta?</login.redirectContainerSpan>
                    <login.redirectContainerLink to="/register">
                        Zerejestruj się
                    </login.redirectContainerLink>
                </login.redirectContainer>
            </login.container>
        </main>
    );
}

export default Login;
