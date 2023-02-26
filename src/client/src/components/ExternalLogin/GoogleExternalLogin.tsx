import React, {useState} from 'react';
import * as style from './styled'
import useAuth from "hooks/useAuth/useAuth";
import {Provider} from "hooks/useAuth/AuthProvider";
import {useNavigate} from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

interface Props {
    providerName: string;
    buttonText: string;
    imgSource: string;
    onClick?: () => void | undefined;
}

function GoogleExternalLogin({providerName, buttonText, imgSource}: Props) {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            auth.externalSignUp(codeResponse.access_token, Provider.GOOGLE, (error, responseMessage) => {
                if (responseMessage !== null){
                    navigate("/");
                } else if (error !== null){
                    setErrorMessage(error.message);
                }
            });
        },
        onError: (_) => setErrorMessage('Wystąpił błąd podczas logowania')
    });
    
    const [errorMessage, setErrorMessage] = useState<string>("");
    const auth = useAuth();
    const navigate = useNavigate();
    
    return (
        <style.container>
            {errorMessage !== "" && <style.validationText>{errorMessage}</style.validationText>}
            <style.button name={providerName}>
                <style.image src={imgSource} alt=""/>
                <style.text name={providerName} onClick={() => login()}>{buttonText}</style.text>
            </style.button>
        </style.container>
    );
}

export default GoogleExternalLogin;
