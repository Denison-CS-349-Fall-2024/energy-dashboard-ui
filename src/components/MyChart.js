import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ToggleButtonGroup from './ToggleButtonGroup.js'
import './MyChart.js'
import { TimePicker } from './TimePicker.js';
import './MyChart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EnergyBarChart = ({ dataset }) => {
  const [chartType, setChartType] = useState('monthly');

  // Function to generate labels based on the chart type
  const getLabels = () => {
    if (chartType === 'monthly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else if (chartType === 'yearly') {
      return ['Year 1', 'Year 2', 'Year 3'];
    } else if (chartType === 'quarterly') {
      return ['Q1', 'Q2', 'Q3', 'Q4'];
    } else if (chartType === 'daily') {
      return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    }
  };

  // Prepare the dataset for the selected chart type
  const prepareData = () => {
    let formattedData = dataset.map(item => {
      return {
        label: item.label,
        backgroundColor: getColor(item.label),
        data: filterData(item.data)
      };
    });
    
    return {
      labels: getLabels(),
      datasets: formattedData
    };
  };

  // Helper to filter data based on the chart type
  const filterData = (data) => {
    if (chartType === 'monthly') {
      return data.slice(0, 12); // Use 12 data points for monthly
    } else if (chartType === 'yearly') {
      return data.slice(0, 3); // Use 3 data points for yearly
    } else if (chartType === 'quarterly') {
      return [data[0], data[1], data[2], data[3]]; // Example slice, adapt based on actual quarter data structure
    } else if (chartType === 'daily') {
      return Array(30).fill().map(() => Math.floor(Math.random() * 100)); // Mock data for daily
    }
  };

  // Helper to generate colors for each dataset
  const getColor = (label) => {
    switch (label) {
      case 'natural gas': return '#0056b3';
      case 'solar': return '#218838';
      case 'electric - grid': return '#c82333';
      default: return 'rgba(255, 99, 132, 0.6)';
    }
  };

  return (
    <div id="chartContainer">
      <Bar 
        data={prepareData()} 
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            // title: { display: true, text: `Energy Consumption - ${chartType.charAt(0).toUpperCase() + chartType.slice(1)}` },
          },
        }} 
      />
    </div>
  );
};

// Sample dataset for 3 years (36 months of data)


export const MyChart = () => {
  const sampleData = [
    { label: 'natural gas', data: [45, 50, 47, 38, 43, 40, 42, 41, 39, 46, 45, 44, 30, 28, 26, 33, 35, 32, 40, 42, 45, 50, 48, 43, 30, 28, 26, 33, 35, 32, 50, 55, 54, 53, 52, 50] },
    { label: 'solar', data: [20, 22, 19, 18, 20, 23, 21, 19, 22, 23, 21, 20, 15, 14, 13, 17, 19, 15, 22, 25, 23, 27, 28, 30, 18, 17, 16, 19, 20, 18, 28, 30, 31, 29, 28, 27] },
    { label: 'electric - grid', data: [10, 12, 11, 9, 8, 7, 6, 8, 9, 10, 9, 8, 12, 15, 14, 12, 11, 10, 16, 18, 17, 19, 20, 22, 12, 14, 15, 18, 20, 19, 20, 21, 22, 23, 24, 25] }
  ];
  return (
    <div className='myChart'>
      <div className='myChartActions'>
        <ToggleButtonGroup></ToggleButtonGroup>
        <TimePicker></TimePicker>
      </div>
      
      <EnergyBarChart dataset={sampleData} />
    </div>
  );
};

