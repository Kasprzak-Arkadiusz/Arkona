import React from 'react';
import * as style from './styled'
import FacebookLogin from "@greatsumini/react-facebook-login";

interface Props {
    providerName: string;
    buttonText: string;
    imgSource: string;
    onClick?: () => void | undefined;
}

const responseFacebook = (response: any) => {
    console.log(response);
}

function FacebookExternalLogin({providerName, buttonText, imgSource}: Props) {
    return (
        <style.button name={providerName}>
            <style.image src={imgSource} alt=""/>
            <FacebookLogin
                appId="543349817485403"
                autoLoad={true}
                onProfileSuccess={res => responseFacebook(res)}
                fields="name,email"
                scope="public_profile"
                render={({onClick}) => <style.text name={providerName} onClick={onClick}>{buttonText}</style.text>}
            />
        </style.button>
    );
}

export default FacebookExternalLogin;
