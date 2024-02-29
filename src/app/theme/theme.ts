import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = {
    light: createTheme({
        palette: {
            mode: 'light',
            //@ts-ignore
            peachy: {
                light: '#fff8f2',
                main: '#ffe6d1'
            },
            secondary: {
                main: green[600],
                dark: green[800],
                light: green[300],
            }
        }
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            //@ts-ignore
            peachy: {
                light: '#fff8f2',
                main: '#ffe6d1'
            },
            secondary: {
                main: green[600],
                dark: green[800],
                light: green[300],
            }
        }
    }),
};
