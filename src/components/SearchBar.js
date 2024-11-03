import Autocomplete from "@mui/joy/Autocomplete"
import Stack from "@mui/joy/Stack"
import Search from "@mui/icons-material/Search"
import React from "react"

export function SearchBar(props) {
  const {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    loadingChartData,
  } = props

  return (
    <Stack spacing={2}>
      <Autocomplete
        startDecorator={<Search />}
        placeholder="Search here..."
        options={sites}
        value={selectedSite}
        getOptionLabel={(option) => option.internal_name || ""}
        disabled={loadingSites || (loadingQuickInsights && loadingChartData)}
        onChange={(event, newValue) => {
          if (newValue && Object.keys(newValue).length) {
            setSelectedSite(newValue)
          }
        }}
      />
    </Stack>
  )
}
