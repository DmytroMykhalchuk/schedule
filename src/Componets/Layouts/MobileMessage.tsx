import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography'
import { useTranslations } from "next-intl";
import styles from './styles.module.scss';

type MobileMessageType = {
};

export const MobileMessage: React.FC<MobileMessageType> = ({ }) => {
    const translation = useTranslations('Mobile');
    return (
        <Paper className={styles.mobileElement}
            sx={{
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
            }}
        >
            <Stack alignItems={'center'} justifyContent={'center'}
                sx={{ height: '100%', }}
            >
                <Typography variant="h5">
                    {translation('message')}
                </Typography>
            </Stack>
        </Paper>
    );
};