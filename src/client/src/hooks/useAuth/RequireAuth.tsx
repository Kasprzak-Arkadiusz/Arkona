﻿import React from "react";
import useAuth from "hooks/useAuth/useAuth";
import {Navigate, useLocation, Outlet} from "react-router-dom";

interface IProps {
    children?: React.ReactNode;
    role?: string | undefined
}

const RequireAuth = ({role, children}: IProps): JSX.Element => {
    const auth = useAuth();
    const location = useLocation();

    const isTokenExpired = () => {
        if (auth.authData === null) {
            return true;
        }

        const decodedToken = auth.authData;

        if (decodedToken.exp === undefined) {
            return true;
        }

        return decodedToken.exp * 1000 < new Date().getTime();
    };

    const isWrongRole = () => {
        if (role === undefined) {
            return false;
        }

        return auth.authData?.role.toLowerCase() !== role;
    };

    if (!auth.authData) {
        return <Navigate to="/access-denied" state={{from: location}} replace/>;
    }

    if (isTokenExpired()) {
        auth.signOut();
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    if (isWrongRole()) {
        return <Navigate to="/access-denied" state={{from: location}} replace/>;
    }

    return children === undefined ? <Outlet/> : <div>{children}</div>
};

export default RequireAuth;