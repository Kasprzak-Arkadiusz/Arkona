import React, {useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {ServiceError, UserClient} from "generated/user/user_pb_service";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "generated/user/user_pb";
import {getStorageItem, setStorageItem} from "utils/storage";
import {Inputs} from "features/register/RegisterForm/RegisterForm"
import * as user_pb from "generated/user/user_pb";

const AuthProvider: React.FC<React.ReactNode> = ({children}) => {
    const [authData, setAuthData] = useState(getStorageItem("authData"));
    const userClient = new UserClient(process.env.REACT_APP_SERVER_URL!);

    useEffect(()=> {
        setAuthData(null);
    }, [setStorageItem])
    
    function MapToRegisterRequest(formData: Inputs): RegisterRequest {
        const request = new RegisterRequest();

        request.setFirstname(formData.firstname);
        request.setLastname(formData.lastname);
        request.setEmail(formData.email);
        request.setPassword(formData.password);

        return request;
    }

    const handleSignUpResponse = (response: RegisterResponse) => {
        response.setRole(response.getRole().toLowerCase());
        setStorageItem("authData", response.toObject());
        setAuthData(getStorageItem("authData"));
    };

    const signUp = (formData: Inputs, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => {
        const request = MapToRegisterRequest(formData);

        const secondCallback = (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => {
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

    const handleSignInResponse = (response: LoginResponse) => {
        setStorageItem("authData", response);
        setAuthData(getStorageItem("authData"));

        return response;
    };

    const signIn = (formData: Inputs): string | null => {
        const request = MapToLoginRequest(formData);

        userClient.login(request, (error, responseMessage) => {
            if (error?.message !== null) {
                return error?.message;
            }

            if (responseMessage !== null) {
                handleSignInResponse(responseMessage);
            }
        });

        return null;
    };

    const signOut = () => {
        setStorageItem("authData", null);
    };

    return <AuthContext.Provider value={{authData, signUp, signIn, signOut}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;