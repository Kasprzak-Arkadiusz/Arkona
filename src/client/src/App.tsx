import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from 'features/home/Home';
import Repertoire from 'features/repertoire/Repertoire';
import Offers from 'features/offers/Offers';
import Tickets from 'features/tickets/Tickets';
import Login from 'features/login/Login';
import Register from 'features/register/Register';
import AuthProvider from "hooks/useAuth/AuthProvider";


import 'assets/index.css';
import GlobalStyle from 'assets/theme/GlobalStyles.js'
import {ThemeProvider} from "styled-components";
import Theme from 'assets/theme/ThemeProvider'

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider theme={Theme}>
                    <GlobalStyle/>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/repertoire" element={<Repertoire/>}/>
                        <Route path="/offers" element={<Offers/>}/>
                        <Route path="/tickets" element={<Tickets/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/*" element={<Navigate to="/"/>}/>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
