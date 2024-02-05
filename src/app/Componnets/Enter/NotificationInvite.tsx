'use client';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useState } from 'react';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

type NotificationInviteType = {
};

export const NotificationInvite: React.FC<NotificationInviteType> = ({ }) => {
    const { searchParams } = new URL(window.location.href);
    const [isOpen, setIsOpen] = useState(() => Boolean(searchParams.get('sended_inviting')));

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={5000}
            onClose={() => { setIsOpen(false) }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={() => { setIsOpen(false) }}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Inviting sended to review
            </Alert>
        </Snackbar>
    );
};