import * as React from "react"
import Button from "@mui/joy/Button"
import { ButtonGroup as MuiButtonGroup } from "@mui/joy"

export default function ButtonGroup(props) {
  const { chartType, setChartType } = props

  const handleClick = (chartType) => {
    setChartType(chartType)
  }

  return (
    <MuiButtonGroup
      aria-label="radius button group"
      sx={{ "--ButtonGroup-radius": "40px" }}
    >
      {["D", "M", "Y", "All"].map((label) => (
        <Button
          key={label}
          className={`button ${chartType === label ? "active" : ""}`}
          onClick={() => handleClick(label)}
        >
          {label}
        </Button>
      ))}
    </MuiButtonGroup>
  )
}
