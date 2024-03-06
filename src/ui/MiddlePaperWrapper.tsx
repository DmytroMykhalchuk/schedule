import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { ReactNode } from 'react';
import Typography from '@mui/material/Typography'

type MiddlePaperWrapperType = {
    children?: ReactNode,
    pathBack?: string
    title?: string
};

export const MiddlePaperWrapper: React.FC<MiddlePaperWrapperType> = ({ children, pathBack, title }) => {
    return (
        <Paper sx={{
            p: 2,
            borderRadius: 4,
            minWidth: { xs: 320, md: 600 },
            backgroundColor: 'background.paper',
        }}>
            {
                (pathBack || title) &&
                <Box mb={2}>
                    {(pathBack && title)
                        ? <Stack alignItems={'center'} direction={'row'}>
                            <Link href={pathBack}><ArrowBackIosIcon sx={{ fontSize: '1.5em' }} /></Link>
                            <Typography variant="h5" textAlign={'center'}>{title}</Typography>

                        </Stack>
                        : title && <Typography variant="h4" textAlign={'center'}>{title}</Typography>
                    }
                </Box>
            }

            {children}
        </Paper >
    );
};