import React, {useState} from "react";
import AuthContext from "./AuthContext";
import {ServiceError, UserClient} from "generated/user/user_pb_service";
import {
    AuthenticationResponse,
    ExternalRegisterRequest,
    LoginRequest,
    RegisterRequest
} from "generated/user/user_pb";
import {getStorageItem, setStorageItem} from "utils/storage";
import {Inputs} from "features/register/RegisterForm/RegisterForm"
import {facebookLogOut} from "components/ExternalLogin/FacebookExternalLogin"
import {CustomJwtPayload} from "utils/CustomTypes/Jwt";
import jwtDecode from "jwt-decode";
import {accessTokenKey, idTokenKey} from "utils/storageItemKeys";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {addDays} from "../../utils/dateUtils";

export enum Provider {
    FACEBOOK = 0,
    GOOGLE = 1
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({children}: Props): JSX.Element => {
    const [idToken, setIdToken] = useState<string | null>(getStorageItem(idTokenKey));
    const [accessToken, setAccessToken] = useState<string | null>(getStorageItem(accessTokenKey));
    const [_, setCookie, removeCookie] = useCookies(["refresh-token"]);
    const userClient = new UserClient(process.env.REACT_APP_SERVER_URL!);
    const navigate = useNavigate();

    function MapToRegisterRequest(formData: Inputs): RegisterRequest {
        const request = new RegisterRequest();

        request.setFirstname(formData.firstname);
        request.setLastname(formData.lastname);
        request.setEmail(formData.email);
        request.setPassword(formData.password);

        return request;
    }

    const signUp = (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
        const request = MapToRegisterRequest(formData);

        const secondCallback = (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => {
            callback(error, responseMessage);
            if (responseMessage !== null) {
                handleAuthResponse(responseMessage);
            }
        }

        userClient.register(request, secondCallback);
    };

    function MapToLoginRequest(formData: Inputs): LoginRequest {
        const request = new LoginRequest();

        request.setEmail(formData.email);
        request.setPassword(formData.password);

        return request;
    }

    const handleAuthResponse = (response: AuthenticationResponse) => {
        console.log(response.toObject())
        setStorageItem(idTokenKey, response.getIdtoken());
        setIdToken(getStorageItem(idTokenKey));
        setStorageItem(accessTokenKey, response.getAccesstoken());
        setAccessToken(response.getAccesstoken());
        setCookie("refresh-token", response.getRefreshtoken(), {
            path: "/",
            expires: addDays(new Date(), 30), 
            sameSite: "strict",
            secure: true
        });
    };

    const signIn = (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
        const request = MapToLoginRequest(formData);

        const secondCallback = (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => {
            callback(error, responseMessage);
            if (responseMessage !== null) {
                handleAuthResponse(responseMessage);
            }
        }

        userClient.login(request, secondCallback);
    };

    const externalSignUp = (accessToken: string, provider: Provider,
                            callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
        const request = new ExternalRegisterRequest();
        request.setAccesstoken(accessToken);
        request.setProvider(provider);

        const secondCallback = (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => {
            callback(error, responseMessage);
            if (responseMessage !== null) {
                handleAuthResponse(responseMessage);
            }
        }

        userClient.externalRegister(request, secondCallback);
    }

    const signOut = () => {
        facebookLogOut();
        setIdToken(null);
        setStorageItem(idTokenKey, null);
        setAccessToken(null);
        setStorageItem(accessTokenKey, null)
        removeCookie("refresh-token");
        navigate("/")
    };

    const decodeJwt = (encodedJwt: string | null): CustomJwtPayload | null => {
        if (encodedJwt === null) {
            return null;
        }

        const decodedJwt = jwtDecode<CustomJwtPayload>(encodedJwt);
        decodedJwt.role = decodedJwt.role.toLowerCase();

        return decodedJwt;
    }

    return <AuthContext.Provider
        value={{
            authData: decodeJwt(idToken),
            accessToken: accessToken,
            signUp,
            signIn,
            externalSignUp,
            signOut
        }}>{children}</AuthContext.Provider>;
}