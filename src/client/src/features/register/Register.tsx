import React from 'react';
import facebook from 'assets/images/facebook-logo.png';
import google from 'assets/images/google-logo.png';

import SectionTitle from 'components/SectionTitle/SectionTitle'
import RegisterForm from './RegisterForm/RegisterForm'
import * as register from './styled'
import FacebookExternalLogin from "./ExternalLogin/FacebookExternalLogin";
import GoogleExternalLogin from "./ExternalLogin/GoogleExternalLogin";

function Register() {
    return (
        <main className="display-container">
            <register.registerContainer>
                <SectionTitle title="Rejestracja"/>
                <RegisterForm/>
                <register.externalProviderContainer>
                    <register.text>lub</register.text>
                    <register.text>zarejestruj się za pomocą:</register.text>
                    <FacebookExternalLogin imgSource={facebook} providerName="Facebook" buttonText="Facebooka"/>
                    <GoogleExternalLogin imgSource={google} providerName="Google" buttonText="Google"/>
                </register.externalProviderContainer>
                <register.haveAnAccountContainer>
                    <register.haveAnAccountContainerSpan>Masz już konto?</register.haveAnAccountContainerSpan>
                    <register.haveAnAccountContainerLink to="/login">
                        Zaloguj się
                    </register.haveAnAccountContainerLink>
                </register.haveAnAccountContainer>
            </register.registerContainer>
        </main>
    );
}

export default Register;
