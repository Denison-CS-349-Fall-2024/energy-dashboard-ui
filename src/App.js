import "./App.css"
import { useEffect, useState } from "react"
import { SearchBar } from "./components/SearchBar"
import { QuickInsights } from "./components/QuickInsights"
import { MyChart } from "./components/MyChart"
import React from "react"
import { MetaData } from "./components/MetaData"
import { makeApiCall } from "./api"
import { getDateTodayInString, stringifyError } from "./helpers"
import { PositionedSnackbar } from "./components/Snackbar"

function App() {
  const [sites, setSites] = useState([])
  const [selectedSite, setSelectedSite] = useState({})
  const [loadingSites, setLoadingSites] = useState(false)

  const [quickInsights, setQuickInsights] = useState({})
  const [selectedQuickInsightsType, setSelectedQuickInsightsType] =
    useState(null)
  const [loadingQuickInsights, setLoadingQuickInsights] = useState(false)

  const [chartDate, setChartDate] = useState(getDateTodayInString())
  const [chartType, setChartType] = useState("Y")
  const [chartData, setChartData] = useState({})
  const [loadingChartData, setLoadingChartData] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("I love snacks")

  const generateChartData = () => {
    setLoadingChartData(true)
    const params = {
      chart_type: chartType,
      chart_date: chartDate,
      id: selectedSite.id,
    }
    makeApiCall("/chart_data", params)
      .then((data) => {
        console.log("makeApiCall(chart_data)", data)
        setChartData(data)
      })
      .catch((error) => {
        setMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingChartData(false)
      })
  }

  const generateQuickInsights = (selectedType) => {
    setLoadingQuickInsights(true)
    const params = {
      id: selectedSite.id,
      type: selectedType,
    }
    makeApiCall("/quick_insights", params)
      .then((data) => {
        setQuickInsights(data)
        console.log("makeApiCall(quick_insights)", data)
      })
      .catch((error) => {
        setMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingQuickInsights(false)
      })
  }

  useEffect(() => {
    setLoadingSites(true)
    makeApiCall("/sites")
      .then((sites) => {
        console.log("makeApiCall(sites)", sites)
        const formatted_sites = sites.map((site) => ({
          ...site,
          label: site.internal_name,
        }))
        setSites(formatted_sites)
        // default to first site
        setSelectedSite(sites[0])
      })
      .catch((error) => {
        setMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingSites(false)
      })
  }, [])

  useEffect(() => {
    if (!Object.keys(selectedSite).length) {
      return
    }

    // default to "solar" if there's solar_edge data for this site. Otherwise, this site only has energy_star data, so default to electric
    const defaultQuickInsightsType = selectedSite.id_solar_edge
      ? "solar"
      : "electric"
    setSelectedQuickInsightsType(defaultQuickInsightsType)
    generateQuickInsights(defaultQuickInsightsType)
    generateChartData()
  }, [selectedSite])

  useEffect(() => {
    if (!Object.keys(selectedSite).length || !selectedQuickInsightsType) {
      return
    }
    generateQuickInsights(selectedQuickInsightsType)
  }, [selectedQuickInsightsType])

  const myChartProps = {
    chartType,
    setChartType,
    chartDate,
    setChartDate,
    chartData,
    generateChartData,
    loadingChartData,
    setLoadingChartData,
  }

  const quickInsightsProps = {
    quickInsights,
    selectedQuickInsightsType,
    setSelectedQuickInsightsType,
    loadingQuickInsights,
  }

  const metadataProps = {
    selectedSite,
  }

  const searchBarProps = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    loadingChartData
  }

  const snackBarProps = {
    openSnackbar,
    setOpenSnackbar,
    message,
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="logo">Dashboard</h1>
        <SearchBar {...searchBarProps}></SearchBar>
        <div className="userActions">Login (todo)</div>
      </div>
      <div className="body1">
        <QuickInsights {...quickInsightsProps}></QuickInsights>
        <MetaData {...metadataProps}></MetaData>
      </div>
      <div className="body2">
        <MyChart {...myChartProps}></MyChart>
      </div>
      <div className="footer">
        <PositionedSnackbar {...snackBarProps}></PositionedSnackbar>
      </div>
    </div>
  )
}

export default App
