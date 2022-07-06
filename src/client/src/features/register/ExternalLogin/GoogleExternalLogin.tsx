import React, {useState} from 'react';
import * as style from './styled'

interface Props {
    providerName: string;
    buttonText: string;
    imgSource: string;
    onClick?: () => void | undefined;
}

function GoogleExternalLogin({providerName, buttonText, imgSource}: Props) {
    const [client, setClient] = useState(() => {
        // return google.accounts.oauth2.initTokenClient({
        //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
        //     scope: 'openid email profile',
        //     callback: (response) => {
        //         console.log(response);
        //     },
        // });

        return google.accounts.oauth2.initCodeClient({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
            scope: 'openid email profile',
            ux_mode: 'popup',
            callback: (response) => {
                console.log(response);
            },
        });
    });
    
    return (
        <style.button name={providerName}>
            <style.image src={imgSource} alt=""/>
            <style.text name={providerName} onClick={() => client.requestCode()}>{buttonText}</style.text>
        </style.button>
    );
}

export default GoogleExternalLogin;
