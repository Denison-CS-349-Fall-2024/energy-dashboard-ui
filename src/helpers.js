const BORDER_COLORS = {
  solar: "hsl(0, 70%, 50%)",
  electric_grid: "hsl(120, 70%, 50%)",
  natural_gas: "hsl(240, 70%, 50%)",
}
const BACKGROUND_COLORS = {
  solar: "hsla(0, 70%, 50%, 0.2)",
  electric_grid: "hsl(120, 70%, 50%, 0.2)",
  natural_gas: "hsl(240, 70%, 50%, 0.2)",
}

export const HOME_SITE = {
  id: "campus_data",
  id_solar_edge: null,
  id_energy_star: 28509337,
  name_solar_edge: null,
  name_energy_star: "Denison University",
  internal_name: "Denison University",
  label: "Denison University",
}

export function formatCampusOverviewData(data) {
  const result = {}

  data.sources.forEach((source) => {
    const label = source.label
    const energyUnit = source.energy_unit

    // Sum all values for this label
    const total = source.data.reduce((sum, entry) => sum + entry.value, 0)

    // Add the result to the dictionary
    result[label] = {
      total,
      energy_unit: energyUnit,
    }
  })

  return result
}

export function truncateZeros(value) {
  const suffixes = ["", "K", "M", "B", "T"]
  let suffixIndex = 0
  let scaledValue = value

  while (scaledValue >= 1000 && suffixIndex < suffixes.length - 1) {
    scaledValue /= 1000
    suffixIndex++
  }

  return `${scaledValue.toFixed(1)}${suffixes[suffixIndex]}`
}

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

export function convertKbtuToWh(kbtu) {
  return kbtu * 293.07
}

export function convertWhToKbtu(wh) {
  return wh / 293.07
}

export function shortenWhValue(wh) {
  let unit
  let formattedValue
  if (wh >= 1e12) {
    formattedValue = (wh / 1e12).toFixed(2)
    unit = "TWh" //  TeraWatt-hours
  } else if (wh >= 1e9) {
    formattedValue = (wh / 1e9).toFixed(2)
    unit = "GWh" // GigaWatt-hours
  } else if (wh >= 1e6) {
    formattedValue = (wh / 1e6).toFixed(2)
    unit = "MWh" // MegaWatt-hours
  } else if (wh >= 1e3) {
    formattedValue = (wh / 1e3).toFixed(2)
    unit = "kWh" // KiloWatt-hours
  } else {
    formattedValue = wh.toFixed(2)
    unit = "Wh" // Watt-hours
  }

  return [parseFloat(formattedValue), unit]
}

export function shortenKbtuValue(kbtu) {
  let unit
  let formattedValue
  if (kbtu >= 1e12) {
    formattedValue = (kbtu / 1e12).toFixed(2)
    unit = "PBtu" // Petabtu
  } else if (kbtu >= 1e9) {
    formattedValue = (kbtu / 1e9).toFixed(2)
    unit = "TBtu" // Terabtu
  } else if (kbtu >= 1e6) {
    formattedValue = (kbtu / 1e6).toFixed(2)
    unit = "GBtu" // Gigabtu
  } else if (kbtu >= 1e3) {
    formattedValue = (kbtu / 1e3).toFixed(2)
    unit = "MBtu" // Megabtu
  } else {
    formattedValue = kbtu.toFixed(2)
    unit = "kBtu" // Default unit
  }

  return [parseFloat(formattedValue), unit]
}

// Convert to preferred units and shorten values if necessary. Input data has shape below
// {
//   solar: {
//     total: 0,
//     energy_unit: "kBtu",
//   },
//   electric_grid: {
//     total: 0,
//     energy_unit: "kBtu",
//   },
//   natural_gas: {
//     total: 0,
//     energy_unit: "kBtu",
//   },
// }
export function cleanCampusOverviewData(data, energyUnitPref) {
  const convertedData = JSON.parse(JSON.stringify(data))

  for (const source in convertedData) {
    // current ktbu, target wh
    if (
      convertedData[source].energy_unit === "kBtu" &&
      energyUnitPref === "Wh"
    ) {
      const [value, unit] = shortenWhValue(
        convertKbtuToWh(convertedData[source].total || 0)
      )
      convertedData[source].total = value
      convertedData[source].energy_unit = unit
      // current wh, target ktbu
    } else if (
      convertedData[source].energy_unit === "Wh" &&
      energyUnitPref === "kBtu"
    ) {
      const [value, unit] = shortenKbtuValue(
        convertWhToKbtu(convertedData[source].total || 0)
      )
      convertedData[source].total = value
      convertedData[source].energy_unit = unit
      // current wh, target wh
    } else if (
      convertedData[source].energy_unit === "Wh" &&
      energyUnitPref === "Wh"
    ) {
      const [value, unit] = shortenWhValue(convertedData[source].total || 0)
      convertedData[source].total = value
      convertedData[source].energy_unit = unit
      // current kbtu, target kbtu
    } else if (
      convertedData[source].energy_unit === "kBtu" &&
      energyUnitPref === "kBtu"
    ) {
      const [value, unit] = shortenKbtuValue(convertedData[source].total || 0)
      convertedData[source].total = value
      convertedData[source].energy_unit = unit
    }
  }

  return convertedData
}

// Convert to preferred units and shorten values if necessary. Input data has shape below
// {
// 	"id": "None__28511082",
// 	"id_solar_edge": null,
// 	"id_energy_star": 28511082,
// 	"installed_on": "2021-03-01",
// 	"lifetime_energy": 4470201.2,
// 	"recent_month_energy": 109177.2,
// 	"energy_unit": "kBtu"
// }
export function cleanQuickInsightsData(data, energyUnitPref) {
  const convertedData = JSON.parse(JSON.stringify(data))

  // current kbtu, target wh
  if (convertedData.energy_unit === "kBtu" && energyUnitPref === "Wh") {
    const [lifetime_energy, lifetime_energy_unit] = shortenWhValue(
      convertKbtuToWh(convertedData.lifetime_energy || 0)
    )
    const [recent_month_energy, recent_month_energy_unit] = shortenWhValue(
      convertKbtuToWh(convertedData.recent_month_energy || 0)
    )
    convertedData.lifetime_energy = lifetime_energy
    convertedData.lifetime_energy_unit = lifetime_energy_unit
    convertedData.recent_month_energy = recent_month_energy
    convertedData.recent_month_energy_unit = recent_month_energy_unit
    // current wh, target ktbu
  } else if (convertedData.energy_unit === "Wh" && energyUnitPref === "kBtu") {
    const [lifetime_energy, lifetime_energy_unit] = shortenKbtuValue(
      convertWhToKbtu(convertedData.lifetime_energy || 0)
    )
    const [recent_month_energy, recent_month_energy_unit] = shortenKbtuValue(
      convertWhToKbtu(convertedData.recent_month_energy || 0)
    )
    convertedData.lifetime_energy = lifetime_energy
    convertedData.lifetime_energy_unit = lifetime_energy_unit
    convertedData.recent_month_energy = recent_month_energy
    convertedData.recent_month_energy_unit = recent_month_energy_unit
    // current wh, target wh
  } else if (convertedData.energy_unit === "Wh" && energyUnitPref === "Wh") {
    const [lifetime_energy, lifetime_energy_unit] = shortenWhValue(
      convertedData.lifetime_energy || 0
    )
    const [recent_month_energy, recent_month_energy_unit] = shortenWhValue(
      convertedData.recent_month_energy || 0
    )
    convertedData.lifetime_energy = lifetime_energy
    convertedData.lifetime_energy_unit = lifetime_energy_unit
    convertedData.recent_month_energy = recent_month_energy
    convertedData.recent_month_energy_unit = recent_month_energy_unit
    // current kbtu, target kbtu
  } else if (
    convertedData.energy_unit === "kBtu" &&
    energyUnitPref === "kBtu"
  ) {
    const [lifetime_energy, lifetime_energy_unit] = shortenKbtuValue(
      convertedData.lifetime_energy || 0
    )
    const [recent_month_energy, recent_month_energy_unit] = shortenKbtuValue(
      convertedData.recent_month_energy || 0
    )
    convertedData.lifetime_energy = lifetime_energy
    convertedData.lifetime_energy_unit = lifetime_energy_unit
    convertedData.recent_month_energy = recent_month_energy
    convertedData.recent_month_energy_unit = recent_month_energy_unit
  }

  return convertedData
}

// Convert to preferred units and shorten values if necessary. Input data has shape below
// {
// 	"sources": [
// 		{
// 			"label": "solar",
// 			"energy_unit": "Wh",
// 			"data": [
// 				{
// 					"date": "2019-01-01 00:00:00",
// 					"value": 12078346.0
// 				},
// 			]
// 		},
// 		{
// 			"label": "electric",
// 			"energy_unit": "kBtu",
// 			"data": [
// 				{
// 					"date": "2020-01-01 00:00:00",
// 					"value": 24207091.4
// 				},
// 			]
// 		},
// 		{
// 			"label": "natural_gas",
// 			"energy_unit": "kBtu",
// 			"data": [
// 				{
// 					"date": "2021-01-01 00:00:00",
// 					"value": 49829993.8
// 				},
// 			]
// 		}
// 	]
// }
export function cleanMyChartData(data, energyUnitPref) {
  if (!data || !data.sources) {
    return data
  }

  const convertedData = JSON.parse(JSON.stringify(data))
  convertedData.sources = convertedData.sources.map((source) => {
    const currentUnit = source.energy_unit
    const needsConversion =
      (currentUnit === "Wh" && energyUnitPref === "kBtu") ||
      (currentUnit === "kBtu" && energyUnitPref === "Wh")

    if (needsConversion) {
      return {
        ...source,
        energy_unit: energyUnitPref,
        data: source.data.map((item) => ({
          ...item,
          value:
            currentUnit === "Wh"
              ? convertWhToKbtu(item.value)
              : convertKbtuToWh(item.value),
        })),
      }
    }

    return source
  })

  return convertedData
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
      borderColor: BORDER_COLORS[source.label],
      backgroundColor: BACKGROUND_COLORS[source.label],
      tension: 0.1,
    }
  })
}
