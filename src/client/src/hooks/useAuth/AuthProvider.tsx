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

export enum Provider {
    FACEBOOK = 0,
    GOOGLE = 1
}

export const AuthProvider: React.FC<React.ReactNode> = ({children}) => {
    const [authData, setAuthData] = useState<string | null>(getStorageItem("authData"));
    const userClient = new UserClient(process.env.REACT_APP_SERVER_URL!);

    function MapToRegisterRequest(formData: Inputs): RegisterRequest {
        const request = new RegisterRequest();

        request.setFirstname(formData.firstname);
        request.setLastname(formData.lastname);
        request.setEmail(formData.email);
        request.setPassword(formData.password);

        return request;
    }

    const handleSignUpResponse = (response: AuthenticationResponse) => {
        setStorageItem("authData", response.getAccesstoken());
        setAuthData(getStorageItem("authData"));
    };

    const signUp = (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
        const request = MapToRegisterRequest(formData);

        const secondCallback = (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => {
            callback(error, responseMessage);
            if (responseMessage !== null) {
                handleSignUpResponse(responseMessage);
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

    const handleSignInResponse = (response: AuthenticationResponse) => {
        setStorageItem("authData", response.getAccesstoken());
        setAuthData(getStorageItem("authData"));
    };

    const signIn = (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
        const request = MapToLoginRequest(formData);

        const secondCallback = (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => {
            callback(error, responseMessage);
            if (responseMessage !== null) {
                handleSignInResponse(responseMessage);
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
                handleSignUpResponse(responseMessage);
            }
        }

        userClient.externalRegister(request, secondCallback);
    }

    const signOut = () => {
        facebookLogOut();
        setAuthData(null);
        setStorageItem("authData", null);
    };
    
    const decodeJwt = (encodedJwt: string | null): CustomJwtPayload | null=> {
        if (encodedJwt === null){
            return null;
        }
        
        const decodedJwt = jwtDecode<CustomJwtPayload>(encodedJwt);
        decodedJwt.role = decodedJwt.role.toLowerCase();
        
        return decodedJwt;
    }

    return <AuthContext.Provider
        value={{authData: decodeJwt(authData), signUp, signIn, externalSignUp, signOut}}>{children}</AuthContext.Provider>;
}