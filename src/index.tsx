import React from 'react';
import ReactDOM from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="359993188931-42s1u7er9aup7hjmj0acmif82l9dk40f.apps.googleusercontent.com">
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
