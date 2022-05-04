import React from 'react';
import Navbar from 'components/layouts/Header/Navbar';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from 'pages/Home/index';
import Repertoire from 'pages/Repertoire/index';
import Offers from 'pages/Offers/index';
import Tickets from 'pages/Tickets/index';
import Login from 'pages/Login/index';
import Register from 'pages/Register/index';

import 'assets/index.css';
import GlobalStyle from 'assets/theme/GlobalStyles.js'
import {ThemeProvider} from "styled-components";
import Theme from 'assets/theme/ThemeProvider'

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
