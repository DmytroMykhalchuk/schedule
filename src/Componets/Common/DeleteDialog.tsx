import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ReactNode } from 'react';
import Link from 'next/link';

type DeleteDialogType = {
    title: string,
    content: ReactNode
    cancelHref: string
    FormWrapper: JSX.ElementType
};

export const DeleteDialog: React.FC<DeleteDialogType> = ({ title, content, cancelHref, FormWrapper }) => {
    return (
        <Dialog open={true}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link href={cancelHref}>
                    <Button color="warning" sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                </Link>
                <FormWrapper />
                <FormWrapper>
                    <Button variant='contained' type='submit' color="warning" sx={{ textTransform: 'none' }}>
                        Confirm
                    </Button>
                </FormWrapper>
            </DialogActions>
        </Dialog>
    );
};