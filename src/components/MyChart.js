import React, { useState } from "react";
import ToggleButtonGroup from "./ButtonGroup.js";
import "./MyChart.js";
import { TimePicker } from "./TimePicker.js";
import "./MyChart.css";
import { EnergyLineChart } from "./EnergyLineChart.js";
import { EnergyBarChart } from "./EnergyBarChart.js";

export const MyChart = (props) => {
  const {
    sampleData,
    currentChartType,
    setCurrentChartType,
    chartTime,
    setChartTime,
  } = props;
  return (
    <div className="chart-container">
      <div className="control-panel">
        <ToggleButtonGroup {...props}></ToggleButtonGroup>
        <TimePicker {...props}></TimePicker>
        <button className="apply-button">Apply</button>
      </div>

      {["D", "M"].includes(currentChartType) ? (
        <EnergyLineChart dataset={sampleData} {...props} />
      ) : (
        <EnergyBarChart dataset={sampleData} {...props} />
      )}
    </div>
  );
};
