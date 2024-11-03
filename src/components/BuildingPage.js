import "../css/Building.css"
import { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import { QuickInsights } from "./QuickInsights"
import { MyChart } from "./MyChart"
import React from "react"
import { MetaData } from "./MetaData"
import { getQuickInsights, getSampleData, getSites } from "../api"

function BuildingPage() {
  const [selectedSite, setSelectedSite] = useState({})
  const [sites, setSites] = useState([])
  const [quickInsightsTypes, setQuickInsightsTypes] = useState([])
  const [selectedQuickInsightsId, setSelectedQuickInsightsId] = useState(null)
  const [quickInsights, setQuickInsights] = useState({})

  const [currentChartType, setCurrentChartType] = useState("M")
  const [chartTime, setChartTime] = useState("2024/10")

  const [sampleData, setSampleData] = useState([])

  const myChartProps = {
    currentChartType,
    setCurrentChartType,
    chartTime,
    setChartTime,
    sampleData,
  }

  const quickInsightsProps = {
    quickInsights,
    quickInsightsTypes,
    selectedQuickInsightsId,
    setSelectedQuickInsightsId,
  }

  const metadataProps = {
    selectedSite,
  }

  const searchBarProps = {
    sites,
    selectedSite,
    setSelectedSite,
  }

  const inferQuickInsightsTypes = (site) => {
    const available_data_types = []
    if (site.solarEdgeId) {
      available_data_types.push({
        id: "solar" + "," + site.solarEdgeId,
        label: "Solar",
        value: site.solarEdgeId,
      })
    }

    if (site.energyStarId) {
      available_data_types.push({
        id: "electricgrid" + "," + site.energyStarId,
        label: "Electric - Grid",
        value: site.energyStarId,
      })

      available_data_types.push({
        id: "naturalgas" + "," + site.energyStarId,
        label: "Natural Gas",
        value: site.energyStarId,
      })
    }

    setQuickInsightsTypes(available_data_types)
    setSelectedQuickInsightsId(available_data_types[0].id)
  }

  useEffect(() => {
    getSites().then((sites) => {
      setSites(sites)
      const firstSite = sites[0]
      setSelectedSite(firstSite)
      inferQuickInsightsTypes(firstSite)
      getQuickInsights().then((data) => {
        setQuickInsights(data)
      })
      setSampleData(getSampleData())
    })
  }, [])

  useEffect(() => {
    if (selectedSite && Object.keys(selectedSite).length) {
      console.log("selectedSite:", selectedSite)
      inferQuickInsightsTypes(selectedSite)
      getQuickInsights().then((data) => {
        setQuickInsights(data)
      })
      setSampleData(getSampleData())
    }
  }, [selectedSite])

  useEffect(() => {
    if (selectedQuickInsightsId) {
      console.log("selectedQuickInsightsId", selectedQuickInsightsId)
      getQuickInsights().then((data) => {
        setQuickInsights(data)
      })
    }
  }, [selectedQuickInsightsId])

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
    </div>
  )
}

export default BuildingPage
