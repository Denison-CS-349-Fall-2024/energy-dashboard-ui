import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { getDataSets, getLabels, truncateZeros } from "../helpers"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const EnergyLineChart = ({ dataSources, chartType }) => {
  const chartData = {
    labels: getLabels(dataSources, chartType),
    datasets: getDataSets(dataSources, chartType),
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:
            chartType === "Y"
              ? "Months"
              : chartType === "M"
                ? "Days"
                : chartType === "D"
                  ? "Hours"
                  : "Years",
        },
      },
      y: {
        title: {
          display: true,
          text: dataSources[0]?.energy_unit,
        },
        ticks: {
          callback: function (value) {
            return truncateZeros(value) // Use the formatter here
          },
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}
