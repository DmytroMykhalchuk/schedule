import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { ThemeColor } from '@/server/actions/types';
import { UIPaper } from '@/ui/UIPaper';

type CountCardType = {
    title: string,
    count: number,
    createUrl: string,
    colorTheme: ThemeColor,
    Icon: ReactNode,
    buttonLabel: string
};

export const CountCard: React.FC<CountCardType> = ({ title, count, createUrl, buttonLabel, colorTheme, Icon, }) => {

    return (
        <UIPaper title={title}
            titleSlot={
                <IconButton aria-label="" color={colorTheme}>
                    {Icon}
                </IconButton>
            }
        >
            <Typography variant="h4" mb={2}>{count}</Typography>
            <Link href={createUrl}>
                <Button variant="contained" color={colorTheme} sx={{
                    textTransform:'none',
                    width:'100%',
                    borderRadius:8,
                }}>
                    {buttonLabel}
                </Button>
            </Link>
        </UIPaper>
    );
};