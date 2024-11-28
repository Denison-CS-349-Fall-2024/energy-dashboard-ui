import React from "react"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import CircularProgress from "@mui/joy/CircularProgress"
import Box from "@mui/joy/Box"

const QuickInsightsSelect = (props) => {
  const {
    quickInsights,
    selectedQuickInsightsType,
    setSelectedQuickInsightsType,
    loadingQuickInsights,
  } = props

  const handleChange = (e, newValue) => {
    setSelectedQuickInsightsType(newValue)
  }

  if (loadingQuickInsights) {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <CircularProgress variant="solid" />
      </Box>
    )
  }

  return (
    <Select
      value={selectedQuickInsightsType}
      onChange={handleChange}
      indicator={<KeyboardArrowDown />}
    >
      <Option value="solar" disabled={!quickInsights.id_solar_edge}>
        Solar
      </Option>
      <Option value="electric_grid" disabled={!quickInsights.id_energy_star}>
        Electric Grid
      </Option>
      <Option value="natural_gas" disabled={!quickInsights.id_energy_star}>
        Natural Gas
      </Option>
    </Select>
  )
}

export default QuickInsightsSelect
