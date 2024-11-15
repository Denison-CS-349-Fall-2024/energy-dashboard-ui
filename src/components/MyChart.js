import React from "react"
import ButtonGroup from "./ButtonGroup.js"
import "./MyChart.js"
import { TimePicker } from "./TimePicker.js"
import "./MyChart.css"
import { EnergyLineChart } from "./EnergyLineChart.js"
import Button from "@mui/joy/Button"

export const MyChart = (props) => {
  const { chartData, generateChartData, loadingChartData } = props

  return (
    <div className="chart-container">
      <div className="control-panel">
        <ButtonGroup {...props}></ButtonGroup>
        <TimePicker {...props}></TimePicker>
        <Button onClick={generateChartData} loading={loadingChartData}>
          Apply
        </Button>
      </div>

      <EnergyLineChart
        dataSources={chartData.sources || []}
        chartType={chartData.chart_type}
      />
      <div style={{ "text-align": "center" }}>1 kBtu = 0.293071 kWh</div>
      <div style={{ "text-align": "center" }}>1 kWh = 3.412141633 kBtu</div>
    </div>
  )
}
