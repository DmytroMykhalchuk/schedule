'use client';

import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import useDebounce from "@/utlis/useDebounce";
type SearchType = {
};

export const Search: React.FC<SearchType> = ({ }) => {

    const [searchInput, setSearchInput] = useState('');

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.currentTarget.value;

        setSearchInput(text);
    };

    const targetSearch = useDebounce(searchInput);

    useEffect(() => {
        if (!targetSearch.length) return;
        
        //todo send request
        console.log('todo send request');
    }, [targetSearch]);


    return (
        <Box flex={1} bgcolor={'secondary'}>
            <FormControl variant="outlined" fullWidth color="warning" sx={{
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
                    value={searchInput}
                    onChange={onChangeSearch}
                    label="Search"
                />

            </FormControl>
        </Box>
    );
};