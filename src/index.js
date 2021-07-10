import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import UserProvider from './context/UserProvider';

ReactDOM.render(
  <React.StrictMode>

      <Router>
          <UserProvider>
             <App />
          </UserProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
