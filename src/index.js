// Importing required modules and components
import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM for rendering the app
import './index.css'; // Importing global styles
import App from './App'; // Main App component
import {
  createBrowserRouter, // Function to create a router
  RouterProvider, // Component to provide the router to the app
  Route, // Optional for defining individual routes
} from 'react-router-dom';

// Importing individual components for different routes
import { LevelEz } from './levels/easyLevel'; // Component for the "easy" level
import { LevelHard } from './levels/hardLevel'; // Component for the "hard" level
import { LevelMed } from './levels/mediumLevel'; // Component for the "medium" level
import { UserLogin } from './components/login'; // Component for user login functionality

import './index.css'; // (Redundant, already imported above)

// Creating a router with routes for different paths
const router = createBrowserRouter([
  {
    path: '/', // Root path
    element: <App />, // Main app component to render for this path
  },
  {
    path: '/easy', // Path for the "easy" level
    element: <LevelEz />, // Component to render for this path
  },
  {
    path: '/hard', // Path for the "hard" level
    element: <LevelHard />, // Component to render for this path
  },
  {
    path: '/medium', // Path for the "medium" level
    element: <LevelMed />, // Component to render for this path
  },
  {
    path: '/login', // Path for user login
    element: <UserLogin />, // Component to render for the login path
  },
]);

// Selecting the root element in the HTML to render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the app inside React.StrictMode for better error detection and warnings
root.render(
  <React.StrictMode>
    {/* RouterProvider makes the router available to the app */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
