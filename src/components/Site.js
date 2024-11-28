import { QuickInsights } from "./QuickInsights"
import { MyChart } from "./MyChart"
import React from "react"
import { MetaData } from "./MetaData"
import "../css/Site.css"
import "../css/App.css"

function Site(props) {
  return (
    <div className="site-container">
      <div className="left-column">
        <QuickInsights {...props}></QuickInsights>
        <MyChart {...props}></MyChart>
      </div>

      <div className="right-column">
        <MetaData {...props}></MetaData>
      </div>
    </div>
  )
}

export default Site
