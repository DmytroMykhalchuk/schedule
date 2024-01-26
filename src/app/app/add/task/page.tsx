import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import styles from './styles.module.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import { FormElementAssignee } from '@/app/Componnets/Add/FormElementAssignee';
import { FormElementStatus } from '@/app/Componnets/Add/FormElementStatus';
import { FormElementProjects } from '@/app/Componnets/Add/FormElementProjects';
import { FormElementDate } from '@/app/Componnets/Add/FormElementDate';
import { FormElementPriority } from '@/app/Componnets/Add/FormElementPriority';
import { FormElementSutasks } from '@/app/Componnets/Add/FormElementSutasks';
import Link from 'next/link';
import { createTask } from './actions';




type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <Stack alignItems={'center'}>
            <Paper sx={{
                borderRadius: 4,
                minWidth: { xs: 320, sm: '100%', md: 600 },
            }}
                component={'form'}
                action={createTask}
            >
                <Stack direction={'row'} sx={{ p: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* <IconButton aria-label="delete" href='#'>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" href='#'>
                            <EditIcon />
                        </IconButton> */}
                    </Box>
                    <Link href={'/app/add'}>
                        <IconButton aria-label="edit">
                            <CloseIcon />
                        </IconButton>
                    </Link>
                </Stack>
                <Box px={2} py={1}>
                    <input className={styles.taskTitle} type='text' name='task_name' required defaultValue={'New task #1'} />
                </Box>
                <Divider />
                <Grid container>
                    <FormElementAssignee />
                    <FormElementStatus />
                    <FormElementProjects />
                    <FormElementDate />
                    <FormElementPriority />
                </Grid>
                <Stack px={2} spacing={2}>
                    <Typography variant="body1" fontWeight={600}>Description</Typography>
                    <TextField
                        multiline
                        minRows={5}
                        color='warning'
                        name='description'
                        sx={{
                            borderWidth: 2,
                            backgroundColor: '#f1f1f1',
                        }}
                    />
                    <Stack direction={'row'} spacing={2}>
                        <Box width={'100%'}>
                            <FormElementSutasks />
                        </Box>
                        <Box width={'100%'}>
                            <TextField
                                multiline
                                minRows={3}
                                color='warning'
                                fullWidth
                                sx={{
                                    borderWidth: 2,
                                    backgroundColor: '#f1f1f1',
                                }}
                                defaultValue={'No comments yet.'}
                            />
                            <Button variant="text" color="warning" size='small'>
                                Send
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
                <Stack alignItems={'center'} py={2}>
                    <Button variant="contained" type='submit' color='warning'>
                        Confirm
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Page;