import React from 'react';
import 'assets/Register.css';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/facebook-logo.png';
import google from '../../assets/images/google-logo.png';
import microsoft from '../../assets/images/microsoft-logo.png';

import PasswordInput from 'components/PasswordInput';
import ExternalLogin from './components/ExternalLogin'

function Register() {
    return (
        <main className="display-container">
            <div className="register-container">
                <section className="container-header">
                    <span className="container-header__text">Rejestracja</span>
                </section>
                <form className="register-form-container">
                    <span className="validation-text">Adres e-mail jest wymagany</span>
                    <label className="register-form-container__label">Adres e-mail:</label>
                    <input type="text" className="register-form-container_input" />

                    <span className="validation-text">
                        Hasło musi mieć minimum 8 znaków, w tym 1 znak specjalny oraz 1 liczbę
                    </span>
                    <PasswordInput inputId="password-input" title="Hasło:" />

                    <span className="validation-text">Hasła są różne!</span>
                    <PasswordInput inputId="confirm-password-input" title="Potwierdź hasło:" />

                    <button type="submit" className="register-form-container__button">
                        Utwórz konto
                    </button>
                </form>
                <section className="external-provider-container">
                    <span className="register-text">lub</span>
                    <span className="register-text">zarejestruj się za pomocą:</span>
                    <ExternalLogin imgSource={facebook} providerName="Facebook" buttonText="Facebooka"/>
                    <ExternalLogin imgSource={google} providerName="Google" buttonText="Google"/>
                    <ExternalLogin imgSource={microsoft} providerName="Microsoft" buttonText="Microsoftu"/>
                </section>
                <section className="have-an-account-container">
                    <span className="have-an-account-container__span">Masz już konto?</span>
                    <Link to="/login" className="have-an-account-container__action">
                        Zaloguj się
                    </Link>
                </section>
                <div className="see-more-container" />
            </div>
        </main>
    );
}

export default Register;
