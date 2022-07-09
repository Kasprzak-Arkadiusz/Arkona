import React, {useState} from 'react';
import * as style from './styled'
import FacebookLogin from "@greatsumini/react-facebook-login";
import useAuth from "hooks/useAuth/useAuth";
import {useNavigate} from "react-router-dom";
import {Provider} from "hooks/useAuth/AuthProvider";

interface Props {
    providerName: string;
    buttonText: string;
    imgSource: string;
    onClick?: () => void | undefined;
}

interface SuccessResponse {
    accessToken: string,
    expiresIn: string,
    reauthorize_required_in: string,
    signedRequest: string,
    userID: string
}

function FacebookExternalLogin({providerName, buttonText, imgSource}: Props) {
    const [errorMessage, setErrorMessage] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    const onSuccessHandler = (response: SuccessResponse | undefined) => {
        if (response !== undefined) {
            auth.externalSignUp(response.accessToken, Provider.FACEBOOK, (error, responseMessage) => {
                if (responseMessage !== null) {
                    navigate("/");
                } else if (error !== null) {
                    setErrorMessage(error.message);
                }
            });
        }
    }
    
    const onFailHandler = (status: string) => {
        console.log(status);
        setErrorMessage("Wystąpił problem podczas połączenia z serwerem Facebooka");
    }

    return (
        <style.container>
            {errorMessage !== "" && <style.validationText>{errorMessage}</style.validationText>}
            <style.button name={providerName}>
                <style.image src={imgSource} alt=""/>
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID!}
                    onSuccess={res => onSuccessHandler(res)}
                    onFail={res => onFailHandler(res.status)}
                    fields="first_name,last_name,email"
                    scope="public_profile"
                    render={({onClick}) => <style.text name={providerName} onClick={onClick}>{buttonText}</style.text>}
                />
            </style.button>
        </style.container>
    );
}

export default FacebookExternalLogin;
