// import "./css/App.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import BuildingPage from "./components/BuildingPage"
import HomePage from "./HomePage"
import { useState } from "react"
import { getDateTodayInString } from "./helpers"

function App() {
  const [sites, setSites] = useState([])
  const [selectedSite, setSelectedSite] = useState({})
  const [loadingSites, setLoadingSites] = useState(false)

  //Chart
  const [chartDate, setChartDate] = useState(getDateTodayInString())
  const [chartType, setChartType] = useState("Y")
  const [chartData, setChartData] = useState({})

  //insight
  const [quickInsights, setQuickInsights] = useState({})
  const [selectedQuickInsightsType, setSelectedQuickInsightsType] =
    useState(null)
  const [loadingChartData, setLoadingChartData] = useState(false)
  const [loadingQuickInsights, setLoadingQuickInsights] = useState(false)

  //error handling
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("I love snacks")

  const homePageProp = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    chartType,
    setChartType,
    chartDate,
    setChartDate,
    chartData,
    loadingChartData,
    setLoadingChartData,
    setChartData,
    setMessage,
    setOpenSnackbar,
    setLoadingSites,
    setQuickInsights,
    setSelectedQuickInsightsType,
    setSites,
    setLoadingQuickInsights,
    selectedQuickInsightsType,
    quickInsights,
    openSnackbar,
    message,
  }

  const buildingPageProp = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    chartType,
    setChartType,
    chartDate,
    setChartDate,
    chartData,
    loadingChartData,
    setLoadingChartData,
    setChartData,
    setMessage,
    setOpenSnackbar,
    setLoadingSites,
    setQuickInsights,
    setSelectedQuickInsightsType,
    setSites,
    setLoadingQuickInsights,
    selectedQuickInsightsType,
    quickInsights,
    openSnackbar,
    message,
  }

  console.log("FROM APP", selectedSite)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage {...homePageProp} />} />
        <Route
          path="/building-overview/"
          element={<BuildingPage {...buildingPageProp} />}
        />
      </Routes>
    </div>
  )
}

export default App
