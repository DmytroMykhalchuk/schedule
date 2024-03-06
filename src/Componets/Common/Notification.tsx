'use client';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

type NotificationType = {
    message: string;
};

export const Notification: React.FC<NotificationType> = ({ message }) => {
    const [isOpen, setIsOpen] = useState(true);

    const onClose = () => setIsOpen(false);

    const renderAction = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={5000}
            onClose={onClose}
            action={renderAction}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={onClose}
                severity="warning"
                variant="filled"
                sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                icon={<CheckIcon fontSize="inherit" />}
            >
                {message}
            </Alert>

        </Snackbar>
    );
};