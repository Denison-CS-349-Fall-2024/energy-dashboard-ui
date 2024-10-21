import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/joy/Stack';
import Search from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import React from 'react';


const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
];


export function SearchBar(props) {
  const {sites, selectedSite, setSelectedSite} = props


  return (
    <Stack spacing={2}>
      <Autocomplete
        startDecorator={<Search />}
        placeholder="Search here..."
        options={sites}
        onChange={(event, newValue) => {
          if (newValue && Object.keys(newValue).length) {
            setSelectedSite(newValue)
          }
        }}
      />
    </Stack>
  );
}
