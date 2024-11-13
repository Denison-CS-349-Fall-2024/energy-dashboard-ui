import React from "react"
import { Box, Typography } from "@mui/material"
import { convertWhTokWh } from "../helpers"
import { Grid } from "@mui/joy"

export function CampusOverview(props) {
  const { solar, electric, gas } = props

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} md={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#E7F9EC",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#4EA45C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <Typography variant="div" sx={{ fontWeight: "bold" }}>
              {convertWhTokWh(0.0)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {"Solar Energy"}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#FFD54F" }}>
              {"kWh"}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6} md={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ebe8fd", // Light yellow background
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#563ff8", // Bright yellow circle
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <Typography variant="div" sx={{ fontWeight: "bold" }}>
              {convertWhTokWh(electric)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {"Electricity"}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#b2a4fb" }}>
              {"kWh"}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={6} md={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#3c20f7", // Light yellow background
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#ffffff", // Bright yellow circle
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <Typography variant="div" sx={{ fontWeight: "bold" }}>
              {convertWhTokWh(gas)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              {"Natural Gas"}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#ffffff" }}>
              {"kWh"}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
