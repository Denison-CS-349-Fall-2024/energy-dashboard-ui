import "./css/App.css"
import { useEffect, useState } from "react"
import { SearchBar } from "./components/SearchBar"
import React from "react"
import { makeApiCall } from "./api"
import {
  formatCampusOverviewData,
  getDateTodayInString,
  HOME_SITE,
  stringifyError,
} from "./helpers"
import Home from "./components/Home"
import Site from "./components/Site"
import DenisonLogo from "./icons/DenisonLogo.png"
import { Box } from "@mui/joy"
import { PositionedSnackbar } from "./components/Snackbar"
import { Switch } from "./components/Switch"

function App() {
  const [isHome, setIsHome] = useState(true)
  const [sites, setSites] = useState([])
  const [selectedSite, setSelectedSite] = useState(HOME_SITE)
  const [loadingSites, setLoadingSites] = useState(false)

  const [quickInsights, setQuickInsights] = useState({})
  const [selectedQuickInsightsType, setSelectedQuickInsightsType] =
    useState(null)
  const [loadingQuickInsights, setLoadingQuickInsights] = useState(false)
  const [campusOverviewData, setCampusOverviewData] = useState({})
  const [campusEnvBenefitsData, setCampusEnvBenefitsData] = useState({})

  const [chartDate, setChartDate] = useState(getDateTodayInString())
  const [chartType, setChartType] = useState("All")
  const [chartData, setChartData] = useState({})
  const [loadingChartData, setLoadingChartData] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackMessage, setSnackMessage] = useState("I love snacks")
  const [energyUnitPref, setEnergyUnitPref] = useState(
    localStorage.getItem("energy_unit_pref") || "Wh"
  )

  const changeEnergyUnitPref = (event) => {
    if (event.target.checked) {
      setEnergyUnitPref("kBtu")
      localStorage.setItem("energy_unit_pref", "kBtu")
    } else {
      setEnergyUnitPref("Wh")
      localStorage.setItem("energy_unit_pref", "Wh")
    }
  }

  const generateChartData = () => {
    setLoadingChartData(true)
    const params = {
      chart_type: chartType,
      chart_date: chartDate,
      id: selectedSite.id,
    }
    makeApiCall("/chart_data", params)
      .then((data) => {
        setChartData(data)
        // only need to fetch campusOverviewData once for the entire app lifecycle
        if (Object.keys(campusOverviewData).length === 0) {
          setCampusOverviewData(formatCampusOverviewData(data))
        }
      })
      .catch((error) => {
        setSnackMessage(stringifyError(error))
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
      })
      .catch((error) => {
        setSnackMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingQuickInsights(false)
      })
  }

  const visitHome = () => {
    setIsHome(true)
    setSelectedSite(HOME_SITE)
  }

  useEffect(() => {
    setLoadingSites(true)
    makeApiCall("/sites")
      .then((sites) => {
        const formatted_sites = sites.map((site) => ({
          ...site,
          label: site.internal_name,
        }))
        setSites(formatted_sites)
      })
      .catch((error) => {
        setSnackMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingSites(false)
      })

    makeApiCall("/campus_env_benefits")
      .then((data) => {
        setCampusEnvBenefitsData(data)
      })
      .catch((error) => {
        setSnackMessage(stringifyError(error))
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

    if (!isHome) {
      // default to "solar" if there's solar_edge data for this site. Otherwise, this site only has energy_star data, so default to electric_grid
      const defaultQuickInsightsType = selectedSite.id_solar_edge
        ? "solar"
        : "electric_grid"
      setSelectedQuickInsightsType(defaultQuickInsightsType)
      generateQuickInsights(defaultQuickInsightsType)
    }

    generateChartData()
  }, [selectedSite])

  useEffect(() => {
    if (
      !Object.keys(selectedSite).length ||
      !selectedQuickInsightsType ||
      isHome
    ) {
      return
    }
    generateQuickInsights(selectedQuickInsightsType)
  }, [selectedQuickInsightsType])

  const searchBarProps = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    setIsHome,
  }

  const props = {
    energyUnitPref,
    changeEnergyUnitPref,
    // props that MyChart will use
    chartType,
    setChartType,
    chartDate,
    setChartDate,
    chartData,
    generateChartData,
    loadingChartData,
    setLoadingChartData,
    // props that QuickInsights will use
    quickInsights,
    selectedQuickInsightsType,
    setSelectedQuickInsightsType,
    loadingQuickInsights,
    // props that MetaData will use
    selectedSite,
    // props that PositionedSnackbar will use
    loadingChartData,
    openSnackbar,
    setOpenSnackbar,
    snackMessage,
    // props that Home will use
    campusOverviewData,
    campusEnvBenefitsData,
  }

  return (
    <div className="App">
      <div className="header">
        <div className="logo" onClick={visitHome}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <h3>Energy</h3>
            <img src={DenisonLogo} height={50} style={{ marginLeft: "10px" }} />
            <h3>ashboard</h3>
          </Box>
        </div>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            gap: "30px",
          }}
        >
          <Switch {...props} />
          <SearchBar {...searchBarProps}></SearchBar>
        </Box>
      </div>

      {isHome ? <Home {...props}></Home> : <Site {...props}></Site>}

      <div className="footer">
        <PositionedSnackbar {...props}></PositionedSnackbar>
      </div>
    </div>
  )
}

export default App
