import React from "react";
import useAuth from "hooks/useAuth/useAuth";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {CustomJwtPayload} from "utils/CustomTypes/CustomJwtPayload";

export const ValidateToken = (role: string) => {
    const auth = useAuth();
    const location = useLocation();
    let validToken = true;

    const isTokenExpired = () => {
        if (auth.authData === null) {
            return true;
        }

        const accessToken = auth.authData.accesstoken;
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);

        if (decodedToken.exp === undefined) {
            return true;
        }
        
        return decodedToken.exp * 1000 < new Date().getTime();
    };

    const isWrongRole = (role: string) => {
        return auth.authData?.role.toLowerCase() !== role;
    };

    if (!auth.authData) {
        validToken = false;
    }
    
    if (isTokenExpired() || isWrongRole(role)) {
        validToken = false;
        auth.signOut();
    }

    if (!validToken) {
        return <Navigate to="/signIn" state={{from: location}} replace/>;
    }

    return <></>
}