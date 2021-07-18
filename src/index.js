import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {BrowserRouter as Router} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import TextsCountProvider from "./context/TextsCountProvider"

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <UserProvider>
              <TextsCountProvider>
             <App />
              </TextsCountProvider>
          </UserProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
