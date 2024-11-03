// import "./css/App.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import BuildingPage from "./components/BuildingPage"
import HomePage from "./HomePage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/building/:id" element={<BuildingPage />} />
      </Routes>
    </div>
  )
}

export default App
