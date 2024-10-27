import React from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import "./MyChart.js"
import "./MyChart.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const EnergyBarChart = (props) => {
  const { dataset, currentChartType } = props

  const getLabels = () => {
    if (currentChartType === "Y") {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    } else if (currentChartType === "All") {
      return ["2022", "2023", "2024"]
    }
  }

  const prepareData = () => {
    let formattedData = dataset.map((item) => {
      return {
        label: item.label,
        backgroundColor: getColor(item.label),
        data: item.data[currentChartType],
      }
    })

    return {
      labels: getLabels(),
      datasets: formattedData,
    }
  }

  const getColor = (label) => {
    switch (label) {
      case "natural gas":
        return "#0395FF"
      case "solar":
        return "#00E096"
      case "electric - grid":
        return "#8A00FF"
      default:
        return "rgba(255, 99, 132, 0.6)"
    }
  }

  return (
    <Bar
      data={prepareData()}
      options={{
        responsive: true,
      }}
    />
  )
}
