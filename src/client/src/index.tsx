import React from 'react';
import 'assets/index.css';
import App from './App';
import {createRoot} from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <App/>
);
