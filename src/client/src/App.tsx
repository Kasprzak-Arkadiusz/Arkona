import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthProvider from "hooks/useAuth/AuthProvider";

import 'assets/index.css';
import GlobalStyle from 'assets/theme/GlobalStyles.js'
import {ThemeProvider} from "styled-components";
import Theme from 'assets/theme/ThemeProvider'
import useAuth from "./hooks/useAuth/useAuth";
import {RouteComponent} from "./components/RouteComponents/RouteComponent";

function App() {
    const auth = useAuth();
    
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider theme={Theme}>
                    <GlobalStyle/>
                    <Navbar/>
                    <RouteComponent/>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
