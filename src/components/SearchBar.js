import Autocomplete from "@mui/joy/Autocomplete"
import Stack from "@mui/joy/Stack"
import Search from "@mui/icons-material/Search"
import React from "react"
import AutocompleteOption from "@mui/joy/AutocompleteOption"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import SolarPowerIcon from "@mui/icons-material/SolarPower"

export function SearchBar(props) {
  const {
    sites,
    selectedSite,
    setSelectedSite,
    loadingSites,
    loadingQuickInsights,
    loadingChartData,
    setIsHome,
  } = props

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        startDecorator={<Search />}
        placeholder="Search here..."
        options={sites.filter((site) => !site.is_parent)}
        value={selectedSite}
        getOptionLabel={(option) => option.internal_name || ""}
        disabled={loadingSites || (loadingQuickInsights && loadingChartData)}
        onChange={(event, newValue) => {
          if (newValue && Object.keys(newValue).length) {
            setSelectedSite(newValue)
            setIsHome(false)
          }
        }}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <ListItemContent sx={{ fontSize: "sm" }}>
              {option.label}
            </ListItemContent>
            {option.id_solar_edge && (
              <ListItemDecorator>
                <SolarPowerIcon />
              </ListItemDecorator>
            )}
          </AutocompleteOption>
        )}
      />
    </Stack>
  )
}
