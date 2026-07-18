import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import MouseContextProvider from './context/mouse-context';
import { HashRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MouseContextProvider>
      <Router>
        <App />
      </Router>
    </MouseContextProvider>
  </React.StrictMode>
);
