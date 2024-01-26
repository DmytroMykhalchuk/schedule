import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Link from "next/link";
import Button from '@mui/material/Button'
import styles from './styles.module.scss';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NotificationInvite } from "../Componnets/Enter/NotificationInvite";


type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {


    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <NotificationInvite/>
            <Paper sx={{
                p: 2,
                borderRadius: 4,
                minWidth: { xs: 320, md: 600 }
            }}>
                <Box mb={2}>
                    <Typography variant="h3" textAlign={'center'}>Welcome!</Typography>
                    <Typography variant="body1" textAlign={'center'}>To use our service you need to have access to some projects.</Typography>
                </Box>
                <Typography variant="h6" color="warning" sx={{ color: 'warning.main' }} textAlign={'center'}>
                    <Link href={'/enter/create-project'}>Create project</Link>
                </Typography>
                <Typography variant="subtitle1" textAlign={'center'}>or</Typography>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <form className={styles.formEntering} action={''}>
                        <TextField 
                        label="Input invite id" 
                        variant="outlined" 
                        name="invite_id"
                        type="text" size="small" color="warning" value={''}
                            sx={{ textAlign: 'center' }}
                        />
                        <Button variant="outlined" color="warning" sx={{ textTransform: 'none' }}>
                            Confirm
                        </Button>
                    </form>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Page;