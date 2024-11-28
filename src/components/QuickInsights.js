import { cleanQuickInsightsData } from "../helpers"
import "../css/Site.css"
import QuickInsightsSelect from "./QuickInsightsSelect"
import React from "react"
import { Box, Grid, Typography } from "@mui/joy"

export const QuickInsights = (props) => {
  const { quickInsights, energyUnitPref } = props

  const {
    installed_on,
    recent_month_energy,
    recent_month_energy_unit,
    lifetime_energy,
    lifetime_energy_unit,
  } = cleanQuickInsightsData(quickInsights, energyUnitPref)

  return (
    <div className="quick-insights-container">
      <div className="insights-header">
        <h2>Site Overview</h2>
        <QuickInsightsSelect {...props}></QuickInsightsSelect>
      </div>
      <Grid container spacing={2}>
        <Grid item sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffe2e5",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#fa5a7e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {installed_on || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Installed on</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff4df",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#ff947a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {recent_month_energy || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Most recent month</Typography>
              <Typography variant="subtitle2">
                {recent_month_energy_unit || "N/A"}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#dcfce7",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#3bd856",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {lifetime_energy || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Lifetime</Typography>
              <Typography variant="subtitle2">
                {lifetime_energy_unit || "N/A"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
