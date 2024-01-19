'use client';

import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
type SearchType = {
};

export const Search: React.FC<SearchType> = ({ }) => {

    return (
        <Box flex={1} bgcolor={'secondary'}>
            <FormControl variant="outlined" fullWidth sx={{
                backgroundColor: '#f1f1f1',
                maxWidth: 380,
            }}>
                <InputLabel>Search</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={'text'}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    label="Search"
                />

            </FormControl>
        </Box>
    );
};