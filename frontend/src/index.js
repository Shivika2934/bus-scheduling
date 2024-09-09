import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root to render the application
const root = createRoot(container);

// Render the application using the new API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
