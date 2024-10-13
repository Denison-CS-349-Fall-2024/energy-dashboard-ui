import './App.css';
import { useRef, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { QuickInsights } from './components/QuickInsights';
import { MetaData } from './components/MetaData';
import { MyChart } from './components/MyChart';

function App() {
  const [currentChartType, setCurrentChartType] = useState("day")
  const [chartTime, setChartTime] = useState("2024/10") 
  const [quickInsightsType, setQuickInsightsType] = useState("solar")

  const myChartProps = {
    currentChartType,
    setCurrentChartType,
    chartTime,
    setChartTime
  }

  const quickInsightsProps = {
    quickInsightsType,
    setQuickInsightsType
  }

  return (
    <div className="App">
      <div className="header">
        <div className="logo">Dashboard</div>
        <SearchBar></SearchBar>
        <div className="userActions">Login/Signup</div>
      </div>
      <div className="body1">
        <QuickInsights {...quickInsightsProps}></QuickInsights>
        <MetaData></MetaData>
      </div>
      <div className="body2">
        <MyChart {...myChartProps}></MyChart>
      </div>
    </div>
  );
}

export default App;
