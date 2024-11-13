import * as React from "react"
import Box from "@mui/joy/Box"
import Snackbar from "@mui/joy/Snackbar"

export function PositionedSnackbar({
  openSnackbarBuilding,
  setOpenSnackbarBuilding,
  messageBuilding,
}) {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbarBuilding}
        onClose={(event, reason) => {
          if (["timeout", "clickaway", "escapeKeyDown"].includes(reason)) {
            setOpenSnackbarBuilding(false)
          }
        }}
        variant="outlined"
        color="danger"
      >
        {messageBuilding}
      </Snackbar>
    </Box>
  )
}
