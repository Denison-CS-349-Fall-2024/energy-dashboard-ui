import "./css/HomePage.css"
import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchBar } from "./components/SearchBar"
// import { getQuickInsights, getSampleData, getSites } from "./api"
import { makeApiCall } from "./api"
import { getDateTodayInString, stringifyError } from "./helpers"
import { MyChart } from "./components/MyChart"
import { CampusOverview } from "./components/CampusOverview"
import { CampusEnvironment } from "./components/CampusEnvironment"

export default function HomePage(props) {
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
    setSites,
    openSnackbar,
    message,
  } = props

  //Overview Data
  const initOverviewData = {
    solar: 0,
    electric: 0,
    gas: 0,
  }

  const initEnvBenefitData = {
    Co2EmissionSaved: 0,
    treesPlanted: 0,
  }
  const [overviewData, setOverViewData] = useState(initOverviewData)
  const [envBenefit, setEnvBenefit] = useState(initEnvBenefitData)

  const searchBarProps = {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    loadingChartData,
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

  const getOverViewData = (sites) => {
    //should change filter to site.id_solar_edge !== null when have full sites access to solarEdge
    const solarSite = sites.filter((site) => site.id_energy_star == null)
    solarSite.forEach((site) => {
      makeApiCall("/quick_insights", { id: site.id, type: "solar" })
        .then((data) => {
          console.log("makeApiCall(quick_insights)", data)
          setOverViewData((prev) => ({
            ...prev,
            solar: data.recent_month_energy,
          }))
        })
        .catch((error) => {
          console.log("SOME OVERVIEW NOT WORKING", error)
        })

      //electric overview
      makeApiCall("/quick_insights", { id: selectedSite.id, type: "electric" })
        .then((data) => {
          console.log("makeApiCall(quick_insights)", data)
          //   overviewData.solar += data.recent_month_energy
          setOverViewData((prev) => ({
            ...prev,
            electric: data.recent_month_energy,
          }))
        })
        .catch((error) => {
          console.log("SOME OVERVIEW NOT WORKING", error)
        })

      //narutal gas overview
      makeApiCall("/quick_insights", {
        id: selectedSite.id,
        type: "natural_gas",
      })
        .then((data) => {
          console.log("makeApiCall(quick_insights)", data)
          //   overviewData.solar += data.recent_month_energy
          setOverViewData((prev) => ({
            ...prev,
            gas: data.recent_month_energy,
          }))
          //   setChartData(data)
        })
        .catch((error) => {
          console.log("SOME OVERVIEW NOT WORKING", error)
        })
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
        // default to Denison (all) site
        const defaultSite = formatted_sites.filter(
          (site) =>
            site.id_energy_star ==
              parseInt(process.env.REACT_APP_HOMEPAGE_ID) &&
            site.id_solar_edge === null
        )
        setSelectedSite(defaultSite[0])
      })
      .catch((error) => {
        setMessage(stringifyError(error))
        setOpenSnackbar(true)
      })
      .finally(() => {
        setLoadingSites(false)
      })
    makeApiCall("/envBenefit").then((envRes) => {
      setEnvBenefit(envRes)
    })
  }, [])

  useEffect(() => {
    //overview data
    getOverViewData(sites)
    //generate chart data
    generateChartData()
  }, [selectedSite])

  return (
    <div className="HomePage">
      <div className="header">
        <h1 className="logo">Electric Dashboard</h1>
        <SearchBar {...searchBarProps}></SearchBar>
        <div className="userActions">Login (todo)</div>
      </div>
      <h2>Campus Overview</h2>
      <CampusOverview {...overviewData} />
      <div className="body2">
        <MyChart {...myChartProps}></MyChart>
      </div>
      <CampusEnvironment {...envBenefit} />
    </div>
  )
}
