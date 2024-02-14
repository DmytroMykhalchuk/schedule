import TextField from "@mui/material/TextField";

type UIInputFieldType = {
    label: string,
    name: string
    value?: string | number
    defaultValue?: string | number
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
};

export const UIInputField: React.FC<UIInputFieldType> = ({ label, name, value, defaultValue, onChange }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            name={name}
            type="text" size="small" color="warning"
            sx={{ textAlign: 'center' }}
            fullWidth
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            required
        />
    );
};