import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
);

export const EnergyLineChart = (props) => {
  const { dataset, currentChartType } = props;

  const getLabels = () => {
    if (currentChartType === "M") {
      return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    } else if (currentChartType === "D") {
      return Array.from({ length: 96 }, (_, i) => {
        const hours = Math.floor(i / 4);
        const minutes = (i % 4) * 15;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      });
    }
  };

  const prepareData = () => {
    let formattedData = dataset.map((item) => {
      return {
        label: item.label,
        backgroundColor: getColor(item.label),
        borderColor: getColor(item.label),
        data: item.data[currentChartType],
        fill: false,
      };
    });

    return {
      labels: getLabels(),
      datasets: formattedData,
    };
  };

  const getColor = (label) => {
    switch (label) {
      case "natural gas":
        return "#0395FF";
      case "solar":
        return "#00E096";
      case "electric - grid":
        return "#8A00FF";
      default:
        return "rgba(255, 99, 132, 0.6)";
    }
  };

  return (
    <Line
      data={prepareData()}
      options={{
        responsive: true,
      }}
    />
  );
};
