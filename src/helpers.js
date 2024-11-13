export function getDateTodayInString() {
  const today = new Date()

  // Get the year, month, and day
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function getFullDateInString(input) {
  const parts = input.split("-")
  let year = parts[0]
  let month = parts[1] || "01" // Default to '01' if month is missing
  let day = parts[2] || "01" // Default to '01' if day is missing

  // Ensure month and day are zero-padded to two digits
  month = month.padStart(2, "0")
  day = day.padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function convertKBTUToWh(kBtu) {
  const kWh = kBtu * 293.07 // Convert to kWh
  const wh = kWh * 1000 // Convert to Wh
  return wh
}

export function convertWhTokWh(value) {
  return (value * 0.001).toFixed(1)
}
export function formatEnergyValue(wh) {
  if (wh >= 1_000_000_000_000) {
    // TWh
    const tWh = wh / 1_000_000_000_000
    return `${tWh.toFixed(2)} TWh`
  } else if (wh >= 1_000_000_000) {
    // GWh
    const gWh = wh / 1_000_000_000
    return `${gWh.toFixed(2)} GWh`
  } else if (wh >= 1_000_000) {
    // MWh
    const mWh = wh / 1_000_000
    return `${mWh.toFixed(2)} MWh`
  } else if (wh >= 1_000) {
    // kWh
    const kWh = wh / 1_000
    return `${kWh.toFixed(2)} kWh`
  } else {
    // Wh
    return `${wh.toFixed(2)} Wh`
  }
}

export function stringifyError(error) {
  if (error instanceof Error) {
    return JSON.stringify({
      name: error.name,
      message: error.message,
    })
  }
  return JSON.stringify({ message: "Not an instance of Error" })
}

// Generate labels based on the chartType
export const getLabels = (dataSources, chartType) => {
  switch (chartType) {
    case "Y": // Monthly labels (Jan to Dec)
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
    case "M": // Daily labels (1 to 31)
      return Array.from({ length: 31 }, (_, i) => (i + 1).toString())
    case "D": // Hourly labels (0 to 23)
      return Array.from({ length: 24 }, (_, i) => i.toString())
    case "All": // Year labels, dynamically filled based on data
      const years = dataSources.flatMap((source) =>
        source.data.map((point) =>
          new Date(point.date).getFullYear().toString()
        )
      )
      return Array.from(new Set(years)).sort() // Unique, sorted years
    default:
      return []
  }
}

// Prepare each data source as a separate dataset
export const getDataSets = (dataSources, chartType) => {
  return dataSources.map((source, index) => {
    const labels = getLabels(dataSources, chartType)
    const dataValues = new Array(labels.length).fill(null)

    source.data.forEach((point) => {
      const date = new Date(point.date)
      let index = -1

      switch (chartType) {
        case "Y":
          index = date.getMonth()
          break
        case "M":
          index = date.getDate() - 1
          break
        case "D":
          index = date.getHours()
          break
        case "All":
          index = labels.indexOf(date.getFullYear().toString())
          break
        default:
          break
      }

      if (index >= 0 && index < dataValues.length) {
        dataValues[index] = point.value
      }
    })

    // Set each dataset with its unique color, label, and data points
    return {
      label: source.label,
      data: dataValues,
      fill: false,
      borderColor: `hsl(${(index * 360) / dataSources.length}, 70%, 50%)`, // Unique color for each dataset
      backgroundColor: `hsla(${
        (index * 360) / dataSources.length
      }, 70%, 50%, 0.2)`,
      tension: 0.1,
    }
  })
}
