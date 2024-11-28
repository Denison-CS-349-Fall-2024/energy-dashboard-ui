import "../css/Home.css"
import "../css/App.css"
import React from "react"
import { MyChart } from "./MyChart"
import { Box, Typography } from "@mui/material"
import { cleanCampusOverviewData } from "../helpers"
import { Grid } from "@mui/joy"
import { EmissionSvg } from "../icons/EmissionSvg"
import { PlantSvg } from "../icons/PlantSvg"
import { SolarArraySvg } from "../icons/SolarArray"

export default function Home(props) {
  const { campusOverviewData, campusEnvBenefitsData, energyUnitPref } = props

  const { solar, electric_grid, natural_gas } = cleanCampusOverviewData(
    campusOverviewData,
    energyUnitPref
  )

  return (
    <div className="home-container">
      <div className="left-column">
        <div className="campus-overview-container">
          <h2>Campus Overview</h2>

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
                    {solar?.total || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {"Solar Energy"}
                  </Typography>
                  <Typography variant="subtitle2">
                    {solar?.energy_unit || "N/A"}
                  </Typography>
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
                  <Typography sx={{ fontWeight: "bold" }}>
                    {electric_grid?.total || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {"Electric Grid"}
                  </Typography>
                  <Typography>{electric_grid?.energy_unit || "N/A"}</Typography>
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
                    {natural_gas?.total || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {"Natural Gas"}
                  </Typography>
                  <Typography variant="subtitle2">
                    {natural_gas?.energy_unit || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
        <MyChart {...props}></MyChart>
      </div>
      <div className="right-column">
        <div className="environmental-container">
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: "10px",
              height: "120px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <SolarArraySvg />
            <Box>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Active Solar Sites
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {campusEnvBenefitsData?.total_solar_sites}
              </Typography>
            </Box>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: "10px",
              height: "120px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <Box>
              <EmissionSvg />
            </Box>
            <Box>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                CO2 Emission Saved
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {`${campusEnvBenefitsData?.total_co2_emission_saved || ""} lbs`}
              </Typography>
            </Box>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: "10px",
              height: "120px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <PlantSvg />
            <Box>
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Equivalent Trees Planted
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                {campusEnvBenefitsData?.total_trees_planted}
              </Typography>
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  )
}
