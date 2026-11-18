import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const rootElement = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;

// Vite serves the unrendered index.html in development; production builds contain
// prerendered markup and should hydrate it instead of replacing it.
if (rootElement.firstElementChild) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);
