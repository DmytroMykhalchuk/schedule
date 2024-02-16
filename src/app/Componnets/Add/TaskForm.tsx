import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import styles from '@/app/Componnets/Add/styles.module.scss';
import { FormElementDescription } from "./Elements/FormElementDescription";
import { FormElementPriority } from "./Elements/FormElementPriority";
import { FormElementDate } from "./Elements/FormElementDate";
import { FormElementProjects } from "./Elements/FormElementProjects";
import { FormElementStatus } from "./Elements/FormElementStatus";
import { FormElementAssignee } from "./Elements/FormElementAssignee";
import { FormElementSutasks } from "./Elements/FormElementSutasks";
import { ReactNode } from "react";
import { CommentType } from "@/server/actions/types";
import { FormElementCategory } from "./Elements/FormElementCategory";

type TaskFormType = {
    defaultValues: {
        taskId?: string,
        assignee?: string | null
        status?: string
        directory?: string
        dueDate?: string
        priority?: string
        description?: string
        title?: string
        subtasks?: string[] | null
        comments?: CommentType[]
        fromHour?: number
        toHour?: number
        categoryId?: string
    },
    labelConfirm: string
    UnderFormSlot?: ReactNode
};

export const TaskForm: React.FC<TaskFormType> = ({ defaultValues, labelConfirm, UnderFormSlot }) => {
    return (
        <>
            <Box px={2} py={1}>
                <input className={styles.taskTitle} type='text' name='task_name' required defaultValue={defaultValues?.title || 'New task #1'} />
            </Box>
            <Divider />
            <Grid container>
                <Grid item xs={12}>
                    <div>
                        <FormElementAssignee fieldName='assignee' defaultValue={defaultValues?.assignee || ''} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <FormElementStatus defaultStatus={defaultValues?.status} />
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementProjects defaultDirectory={defaultValues?.directory} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementDate defaultDueDate={defaultValues?.dueDate} fromHour={defaultValues?.fromHour} toHour={defaultValues?.toHour} taskId={defaultValues?.taskId} />
                    </div>
                </Grid>
                <FormElementPriority defaultPriority={defaultValues?.priority} />
                <FormElementCategory defaultCategoryId={defaultValues.categoryId} />
            </Grid>
            <Stack px={2} spacing={2}>
                <FormElementDescription defaultDescription={defaultValues?.description} />
                <Stack spacing={2}>
                    <Box width={'100%'}>
                        <FormElementSutasks defaultSubtasks={defaultValues.subtasks} />
                    </Box>
                    {
                        UnderFormSlot &&
                        <Box width={'100%'}>
                            {UnderFormSlot}
                        </Box>
                    }
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