// app/ThemeRegistry.tsx
'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getThemeMode } from '@/redux/app/appSelector';
import { ThemeMode } from '@/redux/app/appTypes';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { theme } from '@/configs/theme/theme';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: any) {
    const { options, children } = props;
    const [currentTheme, setCurrentTheme] = useState(null as ThemeMode | null)
    useEffect(() => {
        // Perform localStorage action

    }, []);

    useLayoutEffect(() => {
        const item = localStorage.getItem('themeMode') as ThemeMode || 'light';
        setCurrentTheme(item)
        console.log(item)
    }, [])


    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        //@ts-ignore
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={currentTheme ? theme[currentTheme] : theme.light}>
                {/* <CssBaseline /> */}
                {currentTheme
                    ? <Box sx={{ height: '100vh', overflow: 'auto', backgroundColor: 'background.default', color: 'fpage.main', }}>
                        {children}
                    </Box>
                    : <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'} sx={{ backgroundColor: 'warning.main' }}>
                        <CircularProgress sx={{ color: "#fff" }} />
                    </Stack>
                }
            </ThemeProvider>
        </CacheProvider>
    );
}
