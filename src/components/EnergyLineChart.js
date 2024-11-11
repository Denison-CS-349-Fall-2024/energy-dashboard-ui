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
import { getDataSets, getLabels } from "../helpers"

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
      },
    },
  }

  return <Line data={chartData} options={options} />
}

// const getColor = (label) => {
//   switch (label) {
//     case "natural gas":
//       return "#0395FF"
//     case "solar":
//       return "#00E096"
//     case "electric - grid":
//       return "#8A00FF"
//     default:
//       return "rgba(255, 99, 132, 0.6)"
//   }
// }
