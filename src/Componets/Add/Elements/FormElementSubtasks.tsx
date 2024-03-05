'use client';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

type FormElementSubtasksType = {
    defaultSubtasks?: string[] | null;
    translatedName: string;
    translatedTaskItem: string;
};

export const FormElementSubtasks: React.FC<FormElementSubtasksType> = ({ defaultSubtasks, translatedName, translatedTaskItem }) => {
    const [isExtended, setIsExtended] = useState(Boolean(defaultSubtasks?.length) || false);
    const [subtasks, setSubtasks] = useState(defaultSubtasks || [''] as string[]);

    const onChangeIsExtended = () => {
        setIsExtended((prev: boolean) => !prev);
    };

    const onDeleteSubTask = (position: number) => {
        setSubtasks((prev: string[]) => prev.filter((_, index) => index != position))
    };

    const onAddNewSubtask = () => {
        setSubtasks((prev: string[]) => [...prev, ''])
    };

    const onChangeSubtask = (position: number, subtask: string) => {
        setSubtasks((subtasks: string[]) => {
            return subtasks.map((item, index) => {
                if (index === position) {
                    return subtask;
                }
                return item;
            });
        });
    };

    return (
        <>
            <Typography variant="body1" fontWeight={600}>{translatedName}</Typography>
            <FormControlLabel control={<Checkbox checked={isExtended} onChange={onChangeIsExtended} />} label={translatedName} />
            {isExtended && <Stack spacing={2}>
                {subtasks.map((task, index) => (
                    <SubtasksItem
                        label={translatedTaskItem}
                        key={index}
                        task={`${task}`}
                        position={index}
                        isLastIndex={index === subtasks.length - 1}
                        onDeleteSubTask={() => onDeleteSubTask(index)}
                        onAddNewSubtask={onAddNewSubtask}
                        onChangeSubtask={(event) => onChangeSubtask(index, event.currentTarget.value)}
                        subtask={subtasks[index]}
                    />
                ))}
            </Stack>
            }
        </>
    );
};

type SubtasksItemType = {
    task: string;
    position: number;
    onDeleteSubTask: () => void;
    onAddNewSubtask: () => void;
    isLastIndex: boolean;
    label: string;
    onChangeSubtask: (event: React.ChangeEvent<HTMLInputElement>) => void;
    subtask: string;
};

const SubtasksItem: React.FC<SubtasksItemType> = ({ task, subtask, position, isLastIndex, onAddNewSubtask, onDeleteSubTask, label, onChangeSubtask }) => {
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant="body1">{position + 1}.</Typography>
            <TextField
                label={label}
                name={`subtasks`}
                defaultValue={task}
                size='small'
                onChange={onChangeSubtask}
                value={subtask}
                color='warning'
            />
            {
                isLastIndex
                    ? <IconButton aria-label="add subtask" onClick={onAddNewSubtask} color='success'>
                        <AddIcon />
                    </IconButton>
                    : <IconButton aria-label="delete" onClick={onDeleteSubTask} color='error'>
                        <DeleteIcon />
                    </IconButton>

            }
        </Stack>
    );
};