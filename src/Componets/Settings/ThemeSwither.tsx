'use client'
import { toggleTheme } from '@/redux/app/appReducer';
import { AppDispatch } from '@/redux/store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';

type PageType = {
};

export const ThemeSwither: React.FC<PageType> = ({ }) => {
    const dispatch: AppDispatch = useDispatch();

    const savedTheme = localStorage.getItem('themeMode');

    const onChanegTheme = () => {
        dispatch(toggleTheme());
        window.location.reload();
    };

    return (
        <Box pr={3}>
            <FormControlLabel
                value="start"
                control={<Switch color="warning" defaultChecked={savedTheme === 'dark'} />}
                label="Dark mode"
                labelPlacement="start"
                onChange={onChanegTheme}
                sx={{
                    width:'100%',
                    '&.MuiFormControlLabel-root':{
                        justifyContent:'space-between',
                        width:'100%',
                    }
                }}
            />
        </Box>
    );
};
