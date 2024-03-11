import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import styles from '@/Componets/Add/styles.module.scss';
import { CommentType } from '@/server/actions/types';
import { FormElementAssignee } from './Elements/FormElementAssignee';
import { FormElementCategory } from './Elements/FormElementCategory';
import { FormElementDate } from './Elements/FormElementDate';
import { FormElementDescription } from './Elements/FormElementDescription';
import { FormElementPriority } from './Elements/FormElementPriority';
import { FormElementProjects } from './Elements/FormElementProjects';
import { FormElementStatus } from './Elements/FormElementStatus';
import { FormElementSubtasks } from './Elements/FormElementSubtasks';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

type TaskFormType = {
    defaultValues?: {
        taskId: string;
        assignee: string | null;
        status: string;
        directory: string;
        dueDate: string;
        priority: string;
        description: string;
        title: string;
        subtasks: string[] | null;
        comments: CommentType[];
        fromHour: number;
        toHour: number;
        categoryId: string;
    };
    labelConfirm: string;
    UnderFormSlot?: ReactNode;
    authEmail: string;
    locale: string;
    isDirectoryRequired: boolean;
    isNotAvailableDate: boolean;
};

export const TaskForm: React.FC<TaskFormType> = ({ defaultValues, labelConfirm, UnderFormSlot, authEmail, locale, isDirectoryRequired, isNotAvailableDate }) => {
    const translation = useTranslations('MyTasks');
    const translationForm = useTranslations('Form');

    return (
        <div>
            <input type="hidden" name="auth_email" value={authEmail} />
            <Box px={2} py={1}>
                <input className={styles.taskTitle} type='text' name='task_name' required defaultValue={defaultValues?.title || translation('default_title')} />
            </Box>
            <Divider />
            <Grid container>
                <Grid item xs={12}>
                    <div>
                        <FormElementAssignee fieldName='assignee' defaultValue={defaultValues?.assignee || ''} translatedName={translation('assignee')} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementStatus defaultStatus={defaultValues?.status} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementProjects
                            defaultValue={defaultValues?.directory}
                            authEmail={authEmail}
                            translatedName={translation('project')}
                            translatedDefaultCategory={translation('default_directory')}
                            isDirectoryRequired={isDirectoryRequired}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementDate
                            authEmail={authEmail}
                            defaultDueDate={defaultValues?.dueDate}
                            fromHour={defaultValues?.fromHour}
                            toHour={defaultValues?.toHour}
                            taskId={defaultValues?.taskId}
                            translatedName={translation('due_date')}
                            translatedForbiddenDate={translationForm('forbidden_date', { date: 'date' })}
                            locale={locale}
                            dictionary={{
                                confirm: translationForm('confirm'),
                                cancel: translationForm('cancel'),
                                selectDate: translationForm('select_date'),
                            }}
                            isNotAvailableDate={isNotAvailableDate}
                            defaultAssignee={defaultValues?.assignee}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementPriority defaultPriority={defaultValues?.priority} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FormElementCategory defaultCategoryId={defaultValues?.categoryId} authEmail={authEmail} translatedName={translation('category')} />
                    </div>
                </Grid>
            </Grid>
            <Stack px={2} spacing={2}>
                <FormElementDescription defaultDescription={defaultValues?.description} translatedName={translation('description')} />
                <Stack spacing={2}>
                    <div>
                        <Box width={'100%'}>
                            <FormElementSubtasks
                                translatedTaskItem={translation('task')}
                                defaultSubtasks={defaultValues?.subtasks}
                                translatedName={translation('subtasks')}
                            />
                        </Box>
                    </div>
                    <div>
                        {
                            UnderFormSlot &&
                            <Box width={'100%'}>
                                {UnderFormSlot}
                            </Box>
                        }
                    </div>
                </Stack>
            </Stack>
            <Stack alignItems={'center'} py={2}>
                <div>
                    <Button variant="contained" type='submit' color='warning'>
                        {translationForm(labelConfirm)}
                    </Button>
                </div>
            </Stack>
        </div>
    );
};