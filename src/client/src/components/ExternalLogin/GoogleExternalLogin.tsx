import React, {useState} from 'react';
import * as style from './styled'
import useAuth from "hooks/useAuth/useAuth";
import {Provider} from "hooks/useAuth/AuthProvider";
import {useNavigate} from "react-router-dom";

interface Props {
    providerName: string;
    buttonText: string;
    imgSource: string;
    onClick?: () => void | undefined;
}

interface SuccessResponse {
    authuser: string,
    code: string,
    prompt: string,
    scope: string
}

function GoogleExternalLogin({providerName, buttonText, imgSource}: Props) {
    const [errorMessage, setErrorMessage] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    const [client] = useState(() => {
        return google.accounts.oauth2.initCodeClient({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
            scope: 'openid email profile',
            ux_mode: 'popup',
            callback: (response) => {
                const successResponse = response as SuccessResponse;
                if (successResponse.code !== undefined){
                    auth.externalSignUp(successResponse.code, Provider.GOOGLE, (error, responseMessage) => {
                        if (responseMessage !== null){
                            navigate("/");
                        } else if (error !== null){
                            setErrorMessage(error.message);
                        }
                    });
                }
            },
        });
    });
    
    return (
        <style.container>
            {errorMessage !== "" && <style.validationText>{errorMessage}</style.validationText>}
            <style.button name={providerName}>
                <style.image src={imgSource} alt=""/>
                <style.text name={providerName} onClick={() => client.requestCode()}>{buttonText}</style.text>
            </style.button>
        </style.container>
    );
}

export default GoogleExternalLogin;
