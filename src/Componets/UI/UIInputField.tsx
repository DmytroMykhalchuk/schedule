import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

type UIInputFieldType = {
    label: string,
    name: string
    value?: string | number
    defaultValue?: string | number
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
    type?: 'text' | 'number'
    required?: boolean,
    inputAdorment?: {
        position: 'start' | 'end',
        label: string
    },
    inputProps?: { maxLength?: number }
};

export const UIInputField: React.FC<UIInputFieldType> = ({ label, name, value, defaultValue, onChange, type = 'text', required = false, inputAdorment, inputProps }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            name={name}
            type={type}
            size="small"
            color="warning"
            sx={{ textAlign: 'center' }}
            fullWidth
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            required={required}
            InputProps={
                inputAdorment ?
                    {
                        startAdornment: <InputAdornment position={inputAdorment.position}>{inputAdorment.label}</InputAdornment>,
                    } : {}}
            inputProps={inputProps}
        />
    );
};