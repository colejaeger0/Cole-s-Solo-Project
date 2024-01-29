import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App.js"

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));
root.render(<App />);