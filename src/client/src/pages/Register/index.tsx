import React from 'react';
import 'assets/Register.css';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/facebook-logo.png';
import google from '../../assets/images/google-logo.png';
import microsoft from '../../assets/images/microsoft-logo.png';

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
                    <label className="register-form-container__label">Hasło:</label>
                    <input type="password" className="register-form-container_input" />

                    <span className="validation-text">Hasła są różne!</span>
                    <label className="register-form-container__label">Potwierdź hasło:</label>
                    <input type="password" className="register-form-container_input" />

                    <button type="submit" className="register-form-container__button">
                        Utwórz konto
                    </button>
                </form>
                <section className="external-provider-container">
                    <span className="register-text">lub</span>
                    <span className="register-text">zarejestruj się za pomocą:</span>
                    <button className="external-provider-container__button facebook-button">
                        <img src={facebook} alt="" className="facebook-button__image" />
                        <span className="facebook-button__span">Facebooka</span>
                    </button>
                    <button className="external-provider-container__button google-button">
                        <img src={google} alt="" />
                        <span className="google-button__span">Google</span>
                    </button>
                    <button className="external-provider-container__button microsoft-button">
                        <img src={microsoft} alt="" />
                        <span className="microsoft-button__span">Microsoftu</span>
                    </button>
                </section>
                <section className="have-an-account-container">
                    <span className="have-an-account-container__span">Masz już konto?</span>
                    <Link to="/login" className="have-an-account-container__action">
                        Zaloguj się
                    </Link>
                </section>
                <div className="see-more-container"/>
            </div>
        </main>
    );
}

export default Register;
