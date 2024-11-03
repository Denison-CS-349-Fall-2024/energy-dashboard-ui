import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchBar } from "./components/SearchBar"
import { getQuickInsights, getSampleData, getSites } from "./api"

export default function HomePage() {
  const [selectedSite, setSelectedSite] = useState({})
  const [sites, setSites] = useState([])
  const [sampleData, setSampleData] = useState([])

  const searchBarProps = {
    sites,
    selectedSite,
    setSelectedSite,
  }
  useEffect(() => {
    getSites().then((sites) => {
      setSites(sites)
      setSampleData(getSampleData())
    })
  }, [])

  useEffect(() => {
    if (selectedSite && Object.keys(selectedSite).length) {
      console.log("selectedSite:", selectedSite)
    }
  }, [selectedSite])

  return (
    <div className="header">
      <h1 className="logo">Electric Dashboard</h1>
      <SearchBar {...searchBarProps}></SearchBar>
      <div className="userActions">Login (todo)</div>
    </div>
  )
}
