import {Navigate, Route, Routes} from "react-router-dom";
import Home from "features/home/Home";
import Login from "features/login/Login";
import Register from "features/register/Register";
import {Role} from "utils/CustomTypes/Role";
import Repertoire from "features/repertoire/Repertoire";
import Offers from "features/offers/Offers";
import Tickets from "features/tickets/Tickets";
import React from "react";
import useAuth from "hooks/useAuth/useAuth";

export const RouteComponent = () => {
    const auth = useAuth();

    console.log(auth.authData);
    
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/*" element={<Navigate to="/"/>}/>

            {auth.authData?.role === Role.client && (
                <Route path={`/${Role.client}/`}>
                    <Route path="repertoire" element={<Repertoire/>}/>
                    <Route path="offers" element={<Offers/>}/>
                    <Route path="tickets" element={<Tickets/>}/>
                </Route>)}

            {auth.authData?.role === Role.worker && (
                <Route path={`/${Role.worker}/`}>
                    <Route path="repertoire" element={<Repertoire/>}/>
                    <Route path="offers" element={<Offers/>}/>
                    <Route path="tickets" element={<Tickets/>}/>
                </Route>)}
        </Routes>
    )
}