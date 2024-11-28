import * as React from "react"
import Box from "@mui/joy/Box"
import Snackbar from "@mui/joy/Snackbar"

export function PositionedSnackbar({
  openSnackbar,
  setOpenSnackbar,
  snackMessage,
}) {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={(event, reason) => {
          if (["timeout", "clickaway", "escapeKeyDown"].includes(reason)) {
            setOpenSnackbar(false)
          }
        }}
        variant="solid"
        color="danger"
      >
        {snackMessage}
      </Snackbar>
    </Box>
  )
}
