import React from 'react';
import 'assets/App.css';
import 'assets/index.css';
import Navbar from './layouts/Header/Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Offers from 'pages/Offers';
import Repertoire from 'pages/Repertoire';
import Tickets from 'pages/Tickets';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register'

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/repertoire" element={<Repertoire />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
