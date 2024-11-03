import Autocomplete from "@mui/joy/Autocomplete"
import Stack from "@mui/joy/Stack"
import Search from "@mui/icons-material/Search"
import { useEffect, useState } from "react"
import React from "react"
import { TextField } from "@mui/joy"
import { useNavigate } from "react-router-dom"

const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }]

export function SearchBar(props) {
  const { sites, selectedSite, setSelectedSite } = props
  const navigate = useNavigate()

  return (
    <Stack spacing={2}>
      <Autocomplete
        startDecorator={<Search />}
        placeholder="Search here..."
        options={sites}
        // value={selectedSite}
        onChange={(event, newValue) => {
          if (newValue && Object.keys(newValue).length) {
            setSelectedSite(newValue)
            navigate(`/building/${newValue.id}`)
          }
        }}
      />
    </Stack>
  )
}
