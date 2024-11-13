import "../css/Building.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SearchBar } from "./SearchBar"
import { QuickInsights } from "./QuickInsights"
import { MyChart } from "./MyChart"
import React from "react"
import { MetaData } from "./MetaData"
import { makeApiCall } from "../api"
import { getDateTodayInString, stringifyError } from "../helpers"
import { PositionedSnackbar } from "./Snackbar"
import CryptoJS from "crypto-js"

function Building(props) {
  const {
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
    // setMessage,
    // setOpenSnackbar,
    setLoadingSites,
    setQuickInsights,
    setSelectedQuickInsightsType,
    setSites,
    setLoadingQuickInsights,
    selectedQuickInsightsType,
    quickInsights,
    // openSnackbar,
    // message,
  } = props

  //error handling
  const [openSnackbarBuilding, setOpenSnackbarBuilding] = useState(false)
  const [messageBuilding, setMessageBuilding] = useState("I love snacks")

  const [selectedSiteBuilding, setSelectedSiteBuilding] = useState(() => {
    const userSelectedSide = localStorage.getItem("userSelectedSide")
    return Object.keys(selectedSite).length > 0
      ? selectedSite
      : JSON.parse(
          CryptoJS.AES.decrypt(
            userSelectedSide,
            process.env.REACT_APP_LOCAL_STORAGE_KEY
          ).toString(CryptoJS.enc.Utf8)
        )
  })

  const generateChartData = () => {
    setLoadingChartData(true)
    const params = {
      chart_type: chartType,
      chart_date: chartDate,
      id: selectedSiteBuilding.id,
    }
    makeApiCall("/chart_data", params)
      .then((data) => {
        console.log("makeApiCall(chart_data)", data)
        setChartData(data)
      })
      .catch((error) => {
        setMessageBuilding(stringifyError(error))
        setOpenSnackbarBuilding(true)
      })
      .finally(() => {
        setLoadingChartData(false)
      })
  }

  const generateQuickInsights = (selectedType) => {
    setLoadingQuickInsights(true)
    const params = {
      id: selectedSiteBuilding.id,
      type: selectedType,
    }
    makeApiCall("/quick_insights", params)
      .then((data) => {
        setQuickInsights(data)
        console.log("makeApiCall(quick_insights)", data)
      })
      .catch((error) => {
        console.log("ERROR QUICK INSIGHT")

        setMessageBuilding(stringifyError(error))
        setOpenSnackbarBuilding(true)
      })
      .finally(() => {
        setLoadingQuickInsights(false)
      })
  }

  useEffect(() => {
    if (!Object.keys(selectedSiteBuilding).length) {
      console.log("NO selectedSite", selectedSiteBuilding)
      return
    }
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(selectedSiteBuilding),
      process.env.REACT_APP_LOCAL_STORAGE_KEY
    ).toString()
    localStorage.setItem("userSelectedSide", ciphertext)
    // default to "solar" if there's solar_edge data for this site. Otherwise, this site only has energy_star data, so default to electric
    const defaultQuickInsightsType = selectedSiteBuilding.id_solar_edge
      ? "solar"
      : "electric"
    setSelectedQuickInsightsType(defaultQuickInsightsType)
    generateQuickInsights(defaultQuickInsightsType)
    generateChartData()
  }, [selectedSiteBuilding])

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
    selectedSiteBuilding,
  }

  const searchBarProps = {
    sites,
    selectedSiteBuilding,
    setSelectedSiteBuilding,
    loadingSites,
    loadingQuickInsights,
    loadingChartData,
  }

  const snackBarProps = {
    openSnackbarBuilding,
    setOpenSnackbarBuilding,
    messageBuilding,
  }

  return (
    <div className="App">
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

export default Building
