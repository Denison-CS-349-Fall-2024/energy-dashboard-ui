import React from "react"
import { Box, Typography } from "@mui/material"
import FactoryIcon from "@mui/icons-material/Factory" // Example icon for CO2 Emission
import ParkIcon from "@mui/icons-material/Park" // Example icon for Trees Planted
// import Image from "mui-image" // For custom image (if you install mui-image or replace it)
import { Grid } from "@mui/joy"
import energyIcon from "../img/energyIcon.png"
import treeIcon from "../img/treeIcon.png"
import co2Icon from "../img/co2Icon.png"

export function CampusEnvironment(props) {
  const { Co2EmissionSaved, treesPlanted } = props
  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Environmental Benefits
      </Typography>
      <Grid container spacing={2}>
        {/* CO2 Emission Saved */}
        <Grid item sm={6} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "gray", fontWeight: "bold", mt: 1 }}
              >
                CO2 Emission Saved
              </Typography>
              <img src={co2Icon} alt="Co2 Logo" height="60" width="60" />
            </Box>
            <Typography
              variant="h4"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              {`${Co2EmissionSaved.toFixed(2)} lb`}
            </Typography>
          </Box>
        </Grid>

        <Grid item sm={6} md={4}>
          {/* Equivalent Trees Planted */}
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "gray", fontWeight: "bold", mt: 1 }}
              >
                Equivalent Trees Planted
              </Typography>
              <img src={treeIcon} alt="Tree Logo" height="60" width="60" />
            </Box>
            <Typography
              variant="h4"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              {treesPlanted.toFixed(0)}
            </Typography>
          </Box>
        </Grid>

        <Grid item sm={6} md={4}>
          {/* Energy Star Score */}
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "gray", fontWeight: "bold", mt: 1 }}
              >
                Energy Star Score
              </Typography>
              <img
                src={energyIcon}
                alt="Energy Star Logo"
                height="60"
                width="60"
              />
            </Box>
            <Typography
              variant="h4"
              sx={{ color: "#1E90FF", fontWeight: "bold" }}
            >
              96
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
    // </Box>
  )
}
