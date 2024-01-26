import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from './styles.module.scss';
import { createDirectory } from "./actions";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <Paper sx={{
                p: 2,
                borderRadius: 4,
                minWidth: { xs: 320, md: 600 }
            }}>
                <Typography variant="h4" textAlign={'center'} mb={2}>Create project</Typography>
                <form className={styles.formCreating} action={createDirectory}>
                    <TextField
                        label="Project directory"
                        variant="outlined"
                        name="new_directory"
                        type="text" size="small" color="warning"
                        sx={{ textAlign: 'center' }}
                        fullWidth
                        required
                    />
                    <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                        Create
                    </Button>
                </form>
            </Paper>
        </Stack>
    );
};

export default Page;