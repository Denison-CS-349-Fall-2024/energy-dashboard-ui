import React from "react"
import DownloadIcon from "@mui/icons-material/Download"
import { IconButton } from "@mui/joy"

const DownloadCSVButton = ({ data, loadingChartData }) => {
  const convertToCSV = (jsonData) => {
    // Prepare CSV rows
    const csvRows = []

    // Add CSV header
    csvRows.push("Source,Date,Value,Energy Unit")

    // Iterate through each source (solar, electric, natural_gas)
    jsonData.sources.forEach((source) => {
      // Iterate through data points for each source
      source.data.forEach((dataPoint) => {
        // Create a CSV row
        const row = [
          source.label,
          dataPoint.date,
          dataPoint.value,
          source.energy_unit,
        ]
          .map(
            (value) =>
              // Escape commas and quote strings
              `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")

        csvRows.push(row)
      })
    })

    // Join rows with newline
    return csvRows.join("\n")
  }

  const downloadCSV = () => {
    // Convert JSON to CSV
    const csvContent = convertToCSV(data)

    // Create a Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    // Create a link element
    const link = document.createElement("a")

    // Create a unique filename based on the chart date
    const filename = `energy_data_${data.chart_date}.csv`

    // Check if the link can be downloaded
    if (navigator.msSaveBlob) {
      // For IE 10+
      navigator.msSaveBlob(blob, filename)
    } else {
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <IconButton
      aria-label="delete"
      onClick={downloadCSV}
      color="primary"
      disabled={loadingChartData}
    >
      <DownloadIcon />
    </IconButton>
  )
}

export default DownloadCSVButton
