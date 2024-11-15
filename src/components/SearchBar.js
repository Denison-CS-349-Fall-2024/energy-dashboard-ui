import Autocomplete from "@mui/joy/Autocomplete"
import Stack from "@mui/joy/Stack"
import Search from "@mui/icons-material/Search"
import React from "react"
import { useNavigate } from "react-router-dom"

export function SearchBar(props) {
  const {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    loadingChartData,
  } = props

  const navigate = useNavigate()

  return (
    <Stack spacing={2}>
      <Autocomplete
        startDecorator={<Search />}
        placeholder="Search here..."
        options={sites}
        //landing page does not show search bar value
        value={
          selectedSite.id_energy_star ===
          parseInt(process.env.REACT_APP_HOMEPAGE_ID)
            ? null
            : selectedSite
        }
        getOptionLabel={(option) => option.internal_name || ""}
        disabled={loadingSites || (loadingQuickInsights && loadingChartData)}
        onChange={(event, newValue) => {
          if (newValue && Object.keys(newValue).length) {
            setSelectedSite(newValue)
            navigate("/building-overview/")
          }
        }}
      />
    </Stack>
  )
}
