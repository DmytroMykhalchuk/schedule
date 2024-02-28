import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

type HeaderLayoutType = {
    title: string
    subtitle: string
    slot?: ReactNode
    isCenter?: boolean
    authUser: { name: string, image: string }
};

export const HeaderLayout: React.FC<HeaderLayoutType> = ({ title, subtitle, slot, isCenter, authUser }) => {

    return (
        <Grid container sx={{ pb: 2 }} alignItems={isCenter ? 'center' : undefined}>
            <Grid item xs={slot ? 6 : 10}>
                <Typography variant="h4" fontWeight={600}>
                    {title}
                </Typography>
                <Typography variant="h6">
                    {subtitle}
                </Typography>
            </Grid>
            <Grid item xs={slot ? 6 : 2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={2}>
                {slot && slot}
                    <Avatar src={authUser.image} alt={authUser.name} sx={{ width: 60, height: 60 }} />
                </Stack>
            </Grid>
        </Grid>
    );
};