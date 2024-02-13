'use client';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type FormElementSutasksType = {
    defaultSubtasks?: string[] | null
};

export const FormElementSutasks: React.FC<FormElementSutasksType> = ({ defaultSubtasks }) => {
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

    return (
        <>
            <Typography variant="body1" fontWeight={600}>Subtasks</Typography>
            <FormControlLabel control={<Checkbox checked={isExtended} onChange={onChangeIsExtended} />} label="Subtasks" />
            {isExtended && <Stack spacing={2}>
                {subtasks.map((task, index) => (
                    <SubtasksItem
                        key={index}
                        task={`${task}`}
                        position={index}
                        isLastIndex={index === subtasks.length - 1}
                        onDeleteSubTask={() => onDeleteSubTask(index)}
                        onAddNewSubtask={onAddNewSubtask}
                    />
                ))}
            </Stack>
            }
        </>
    );
};

type SubtasksItemType = {
    task: string
    position: number
    onDeleteSubTask: () => void
    onAddNewSubtask: () => void
    isLastIndex: boolean
};

const SubtasksItem: React.FC<SubtasksItemType> = ({ task, position, isLastIndex, onAddNewSubtask, onDeleteSubTask }) => {
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant="body1">{position + 1}.</Typography>
            <TextField
                label="Task"
                name={`subtasks`}
                defaultValue={task}
                size='small'
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