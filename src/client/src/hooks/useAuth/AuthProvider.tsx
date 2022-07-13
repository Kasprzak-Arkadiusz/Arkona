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

export enum Provider {
    FACEBOOK = 0,
    GOOGLE = 1
}

export const AuthProvider: React.FC<React.ReactNode> = ({children}) => {
    const [authData, setAuthData] = useState(getStorageItem("authData"));
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
        response.setRole(response.getRole().toLowerCase());
        setStorageItem("authData", response.toObject());
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
        response.setRole(response.getRole().toLowerCase());
        setStorageItem("authData", response.toObject());
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
        setAuthData(null);
        setStorageItem("authData", null);
    };

    return <AuthContext.Provider
        value={{authData, signUp, signIn, externalSignUp, signOut}}>{children}</AuthContext.Provider>;
}