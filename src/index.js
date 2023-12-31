import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { LevelEz } from './levels/easyLevel';
import {LevelHard} from './levels/hardLevel';
import { LevelMed } from './levels/mediumLevel';
import {UserLogin} from './components/login';

import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

  },
  {
    path: '/easy',
    element: <LevelEz />,

  },

  {
    path: '/hard',
    element:  <LevelHard />,
  },
  {
    path: '/medium',
    element: <LevelMed />
  },
  {
    path: '/login',
    element: <UserLogin />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     
    <RouterProvider router={router} />


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

