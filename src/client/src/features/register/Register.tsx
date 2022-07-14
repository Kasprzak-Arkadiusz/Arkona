import React from 'react';
import * as register from 'assets/styles/authenticationStyle'
import facebook from 'assets/images/facebook-logo.png';
import google from 'assets/images/google-logo.png';

import SectionTitle from 'components/SectionTitle/SectionTitle'
import RegisterForm from './RegisterForm/RegisterForm'
import FacebookExternalLogin from "components/ExternalLogin/FacebookExternalLogin";
import GoogleExternalLogin from "components/ExternalLogin/GoogleExternalLogin";

function Register() {
    return (
        <main className="display-container">
            <register.container>
                <SectionTitle title="Rejestracja"/>
                <RegisterForm/>
                <register.externalProviderContainer>
                    <register.text>lub</register.text>
                    <register.text>zarejestruj się za pomocą:</register.text>
                    <FacebookExternalLogin imgSource={facebook} providerName="Facebook" buttonText="Facebooka"/>
                    <GoogleExternalLogin imgSource={google} providerName="Google" buttonText="Google"/>
                </register.externalProviderContainer>
                <register.redirectContainer>
                    <register.redirectContainerSpan>Masz już konto?</register.redirectContainerSpan>
                    <register.redirectContainerLink to="/login">
                        Zaloguj się
                    </register.redirectContainerLink>
                </register.redirectContainer>
            </register.container>
        </main>
    );
}

export default Register;
