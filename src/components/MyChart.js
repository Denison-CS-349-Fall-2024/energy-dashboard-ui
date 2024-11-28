import React from "react"
import ButtonGroup from "./ButtonGroup.js"
import "./MyChart.js"
import { TimePicker } from "./TimePicker.js"
import "../css/MyChart.css"
import { EnergyLineChart } from "./EnergyLineChart.js"
import Button from "@mui/joy/Button"
import { cleanMyChartData } from "../helpers.js"
import Tooltip from "@mui/joy/Tooltip"
import Box from "@mui/joy/Box"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import DownloadCSVButton from "./DownloadCsvButton.js"
import { CircularProgress } from "@mui/joy"

export const MyChart = (props) => {
  const { chartData, generateChartData, loadingChartData, energyUnitPref } =
    props

  const convertedChartData = cleanMyChartData(chartData, energyUnitPref)

  return (
    <div className="chart-container">
      <div className="control-panel">
        <Tooltip
          title="D and M are not available for natural gas and electric grid data (EnergyStar)"
          placement="top"
          variant="outlined"
          color="warning"
        >
          <InfoOutlinedIcon />
        </Tooltip>
        <ButtonGroup {...props}></ButtonGroup>
        <TimePicker {...props}></TimePicker>
        <Button onClick={generateChartData} loading={loadingChartData}>
          Apply
        </Button>
        <DownloadCSVButton
          data={chartData}
          loadingChartData={loadingChartData}
        />
      </div>

      {convertedChartData && Object.keys(convertedChartData).length ? (
        <EnergyLineChart
          dataSources={convertedChartData.sources}
          chartType={convertedChartData.chart_type}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  )
}
