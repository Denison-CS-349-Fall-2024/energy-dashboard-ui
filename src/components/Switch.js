import React from "react"
import { Switch as MuiSwitch } from "@mui/joy"

export function Switch({ energyUnitPref, changeEnergyUnitPref }) {
  return (
    <MuiSwitch
      color={energyUnitPref === "kBtu" && "primary"}
      slotProps={{ input: { "aria-label": "dark mode" } }}
      startDecorator="Wh"
      endDecorator="kBtu"
      checked={energyUnitPref == "kBtu"}
      onChange={changeEnergyUnitPref}
    />
  )
}
