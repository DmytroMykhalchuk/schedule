import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './styles.module.scss'
import { createProject } from './actions';
import { getUserSessionAndEmail } from '@/Componets/actions';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack
            pt={2}
            alignItems={'center'}
            justifyContent={'center'}
        >

            <Paper sx={{
                p: 2,
                borderRadius: 4,
                minWidth: { xs: 320, md: 600 }
            }}>
                <Typography variant="h4" textAlign={'center'} mb={2}>Create project</Typography>
                <form className={styles.formCreating} action={createProject}>
                    <input type="hidden" name="auth_email" value={authEmail} />
                    <TextField
                        label="Project name"
                        variant="outlined"
                        name="new_project_name"
                        type="text" size="small" color="warning"
                        sx={{ textAlign: 'center' }}
                        fullWidth
                        required
                    />
                    <Button variant="outlined" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                        Create
                    </Button>
                </form>
            </Paper>
        </Stack>
    );
};

export default Page;