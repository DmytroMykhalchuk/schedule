import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import styles from '@/app/Componnets/Add/styles.module.scss';
import { FormElementDescription } from "./FormElementDescription";
import { FormElementPriority } from "./FormElementPriority";
import { FormElementDate } from "./FormElementDate";
import { FormElementProjects } from "./FormElementProjects";
import { FormElementStatus } from "./FormElementStatus";
import { FormElementAssignee } from "./FormElementAssignee";
import { FormElementSutasks } from "./FormElementSutasks";
import { CommentType } from "@/server/actions/TaskActions";

type TaskFormType = {
    defaultValues: {
        assignee?: string
        status?: string
        directory?: string
        dueDate?: string
        priority?: string
        description?: string
        title?: string
        subtasks?: string[]
        comments?: CommentType[]
    },
    labelConfirm: string
};

export const TaskForm: React.FC<TaskFormType> = ({ defaultValues, labelConfirm }) => {
    return (
        <>
            <Box px={2} py={1}>
                <input className={styles.taskTitle} type='text' name='task_name' required defaultValue={defaultValues?.title || 'New task #1'} />
            </Box>
            <Divider />
            <Grid container>
                <FormElementAssignee fieldName='assignee' defaultValue={defaultValues?.assignee || ''} />
                <FormElementStatus defaultStatus={defaultValues?.status} />
                <FormElementProjects defaultDirectory={defaultValues?.directory} />
                <FormElementDate defaultDueDate={defaultValues?.dueDate} />
                <FormElementPriority defaultPriority={defaultValues?.priority} />
            </Grid>
            <Stack px={2} spacing={2}>
                <FormElementDescription defaultDescription={defaultValues?.description} />
                <Stack spacing={2}>
                    <Box width={'100%'}>
                        <FormElementSutasks defaultSubtasks={defaultValues.subtasks} />
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
                    {labelConfirm}
                </Button>
            </Stack>
        </>
    );
};