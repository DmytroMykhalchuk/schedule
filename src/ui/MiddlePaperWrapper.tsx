import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { ReactNode } from 'react';

type MiddlePaperWrapperType = {
    children?: ReactNode,
    pathBacck?: string
};

export const MiddlePaperWrapper: React.FC<MiddlePaperWrapperType> = ({ children, pathBacck }) => {
    return (
        <Paper sx={{
            p: 2,
            borderRadius: 4,
            minWidth: { xs: 320, md: 600 },
            backgroundColor: 'background.paper',
        }}>
            {pathBacck &&
                < Stack alignItems={'start'}>
                    <Link href={pathBacck}><ArrowBackIosIcon /></Link>
                </Stack>
            }
            {children}
        </Paper >
    );
};