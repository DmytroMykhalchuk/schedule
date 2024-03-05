import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getUserSessionAndEmail } from '../actions';

type HeaderWithBreadcrumbsType = {
    title: string | { linkLabel: string, linkHref: string }[]
    subtitle: string
};

export const HeaderWithBreadcrumbs: React.FC<HeaderWithBreadcrumbsType> = async ({ title, subtitle }) => {
    const { session } = await getUserSessionAndEmail();

    const renderTitle = (): JSX.Element => {
        if (Array.isArray(title)) {
            return (<Typography variant="h5" sx={{ display: 'flex', gap: 1 }}>
                {
                    title.map((item, index) => item.linkHref
                        ? (<span key={index}><Link href={'#'}>{item.linkLabel}</Link> / </span>)
                        : (<span key={index} style={{ fontWeight: 600 }}>{item.linkLabel}</span>)
                    )
                }
            </Typography>)
        }
        return (
            <Typography variant="h4" fontWeight={600}>
                {title}
            </Typography>
        );
    }

    return (
        <Grid container sx={{ pb: 2 }} alignItems={'center'}>
            <Grid item xs={10}>
                {renderTitle()}
                <Typography variant="h6">
                    {subtitle}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={2}>
                    <Avatar src={session?.user?.image||undefined} alt={session?.user?.name||undefined} sx={{ width: 60, height: 60 }} />
                </Stack>
            </Grid>
        </Grid >
    );
};