import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

type UIButtonType = {
    type?: 'button' | 'submit',
    color?: 'primary' | 'secondary' | 'warning' | 'info',
    variant?: 'outlined' | 'contained' | 'text',
    sx?: SxProps
    onClick?: () => void
    label: string,
};

export const UIButton: React.FC<UIButtonType> = ({
    color = 'warning',
    type = 'button',
    variant = 'contained',
    onClick, label,
    sx,
}) => {

    return (
        <Button
            variant={variant}
            type={type}
            color={color}
            onClick={onClick}
            sx={{
                textTransform: 'none',
                ...sx,
            }}>
            {label}
        </Button>
    );
};