import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "hooks/useAuth/AuthProvider";

import 'assets/index.css';
import GlobalStyle from 'assets/theme/GlobalStyles.js'
import {ThemeProvider} from "styled-components";
import Theme from 'assets/theme/ThemeProvider'
import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import {Role} from "./utils/CustomTypes/Role";
import RequireAuth from "./hooks/useAuth/RequireAuth";
import Repertoire from "./features/repertoire/Repertoire";
import Offers from "./features/offers/Offers";
import Privacy from "./features/privacy/Privacy";
import MovieDetails from "./features/movies/details/MovieDetails";
import TicketsPurchase from "./features/tickets/purchase/TicketsPurchase";
import OwnTickets from "./features/tickets/viewPurchased/OwnTickets";
import UnauthorizedPage from "./features/common/UnauthorizedPage";
import {CookiesProvider} from 'react-cookie';

function App() {
    return (
        <Router>
            <CookiesProvider>
                <AuthProvider>
                    <ThemeProvider theme={Theme}>
                        <GlobalStyle/>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/privacy" element={<Privacy/>}/>
                            <Route path="/*" element={<Navigate to="/"/>}/>
                            <Route path="/access-denied" element={<UnauthorizedPage/>}/>

                            <Route path="repertoire" element={<Repertoire/>}/>
                            <Route path="offers" element={<Offers/>}/>
                            <Route path="movie/:id/" element={<MovieDetails/>}/>
                            <Route path="movie/:id/tickets-purchase/:seanceId/:action" element={
                                <RequireAuth>
                                    <TicketsPurchase/>
                                </RequireAuth>
                            }/>

                            <Route path={`/${Role.client}/tickets`} element={
                                <RequireAuth role={Role.client}>
                                    <OwnTickets/>
                                </RequireAuth>}
                            />

                            <Route path={`/${Role.worker}/`}
                                   element={<RequireAuth role={Role.worker}/>}>
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </AuthProvider>
            </CookiesProvider>
        </Router>
    )
        ;
}

export default App;
