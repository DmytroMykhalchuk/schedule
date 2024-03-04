import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = {
    light: createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#F7F5F4',
            },
            //@ts-ignore
            fpage: {
                main: '#000',
            },
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
            background: {
                default: '#2c2c2c',
            },
            //@ts-ignore
            fpage: {
                main: '#fff',
            },
            //@ts-ignore
            peachy: {
                light: '#3d3d3d', // світлий колір фону
                main: '#7d685e'   // основний колір, контрастуючий з фоном
            },
            secondary: {
                main: green[600],
                dark: green[800],
                light: green[300],
            }
        }
    }),
};
