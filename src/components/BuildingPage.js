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
  } = props

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
        console.log("ERROR QUICK INSIGHT")

        setMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingQuickInsights(false)
      })
  }

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
    loadingChartData,
  }

  const snackBarProps = {
    openSnackbar,
    setOpenSnackbar,
    message,
  }

  console.log("building", selectedSite)

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
