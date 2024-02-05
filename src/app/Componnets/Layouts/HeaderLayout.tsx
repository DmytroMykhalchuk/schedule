import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { cookies } from "next/headers";
import styles from './styles.module.scss';
import Image from "next/image";
import Typography from '@mui/material/Typography'
import { ReactNode } from "react";
import Avatar from "@mui/material/Avatar";

type HeaderLayoutType = {
    title: string
    subtitle: string
    slot?: ReactNode
    isCenter?: boolean
};

export const HeaderLayout: React.FC<HeaderLayoutType> = ({ title, subtitle, slot, isCenter }) => {
    const authUser = JSON.parse(cookies().get('auth')?.value || '{}');

    return (
        <Grid container sx={{ pb: 2 }} alignItems={isCenter ? 'center' : undefined}>
            <Grid item xs={12} md={4}>
                <Typography variant="h4" fontWeight={600}>
                    {title}
                </Typography>
                <Typography variant="h6">
                    {subtitle}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={2}>
                    {slot}
                    <Avatar src={authUser.picture} alt={authUser.name} sx={{ width: 80, height: 80 }} />
                </Stack>
            </Grid>
        </Grid>
    );
};