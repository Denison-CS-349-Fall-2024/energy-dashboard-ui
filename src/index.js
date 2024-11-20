import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom"
import "./AuthPage.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

