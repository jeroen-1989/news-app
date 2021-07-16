import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {BrowserRouter as Router} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import CountProvider from "./context/CountProvider"

ReactDOM.render(
  <React.StrictMode>

      <Router>

          <UserProvider>
              <CountProvider>
             <App />
              </CountProvider>
          </UserProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
