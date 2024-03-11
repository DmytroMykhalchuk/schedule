import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { ReactNode } from 'react';

type FormSelectType = {
    labelId?: string;
    label?: string;
    isFullWidth?: boolean;
    children: ReactNode;
    name: string;
    required?: boolean;
    defaultValue?: string;
    isBorderless?: boolean;
    hasPadding?: boolean;
};

export const FormSelect: React.FC<FormSelectType> = ({ label, labelId, isFullWidth, children, name, required, defaultValue, isBorderless = true, hasPadding }) => {
    return (
        <FormControl fullWidth={isFullWidth} size='small' color='warning'>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                label={label}
                defaultValue={defaultValue}
                name={name}
                required={required}
                size='small'
                color='warning'
                sx={{
                    '& svg.MuiSelect-icon': {
                        display: 'none',
                    },
                    '& .MuiSelect-select': {
                        p: hasPadding ? undefined : 0,
                    },
                    '& fieldset': {
                        border: isBorderless ? 'none' : undefined,
                    }
                }}
            >
                {children}
            </Select>
        </FormControl>
    );
};