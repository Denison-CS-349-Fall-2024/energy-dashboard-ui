import React from "react"
import { Box, Switch as MuiSwitch } from "@mui/joy"
import Tooltip from "@mui/joy/Tooltip"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

export function Switch({ energyUnitPref, changeEnergyUnitPref }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        justifyItems: "center",
      }}
    >
      <MuiSwitch
        color={energyUnitPref === "kBtu" && "primary"}
        slotProps={{ input: { "aria-label": "dark mode" } }}
        startDecorator="Wh"
        endDecorator="kBtu"
        checked={energyUnitPref == "kBtu"}
        onChange={changeEnergyUnitPref}
      />
      <Tooltip
        title='As a convention, SolarEdge uses Wh for solar data while EnergyStar uses kBtu for electric grid / natural gas data. They are convertible.'
        placement="top"
        variant="outlined"
        color="warning"
      >
        <InfoOutlinedIcon />
      </Tooltip>
    </Box>
  )
}
