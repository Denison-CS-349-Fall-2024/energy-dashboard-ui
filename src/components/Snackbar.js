import * as React from "react"
import Box from "@mui/joy/Box"
import Snackbar from "@mui/joy/Snackbar"

export function PositionedSnackbar({ openSnackbar, setOpenSnackbar, message }) {
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
        variant="outlined"
        color="danger"
      >
        {message}
      </Snackbar>
    </Box>
  )
}
