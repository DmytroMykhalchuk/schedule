import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type DeleteDialogType = {
    title?: string;
    content?: ReactNode;
    cancelHref: string;
    FormWrapper: JSX.ElementType;
};

export const DeleteDialog: React.FC<DeleteDialogType> = ({ title, content, cancelHref, FormWrapper }) => {
    const translation = useTranslations('Modal');

    const modalTitle = title ? title : translation('confirm_action');
    const modalContent = content ? content : translation('default_delete_message');

    return (
        <Dialog open={true}>
            <DialogTitle>
                {modalTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {modalContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link href={cancelHref}>
                    <Button color="warning" sx={{ textTransform: 'none' }}>
                        {translation('cancel')}
                    </Button>
                </Link>
                <div>
                    <FormWrapper>
                        <Button variant='contained' type='submit' color="warning" sx={{ textTransform: 'none' }}>
                            {translation('confirm')}
                        </Button>
                    </FormWrapper>
                </div>
            </DialogActions>
        </Dialog>
    );
};