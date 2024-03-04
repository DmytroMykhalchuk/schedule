import { useState } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import CloseIcon from '@mui/icons-material/Close';

type NewCommentFormType = {
    onSend: (comment: string) => void;
    replydTo?: string;
    onCancelReply: () => void;
    dictionary: {
        replyTo: string;
    };
};

export const NewCommentForm: React.FC<NewCommentFormType> = ({ onSend, replydTo, onCancelReply, dictionary }) => {
    const [newComment, setNewComment] = useState('');

    const onChangeNewComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setNewComment(value);
    };

    const onConfirm = () => {
        onSend(newComment);
        setNewComment('');
    };

    return (
        <Stack>
            {replydTo &&
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <ReplyAllIcon sx={{ fontSize: 20 }} />
                    <Typography variant="subtitle2" alignItems={'center'} flex={1}>{dictionary.replyTo} {replydTo}</Typography>
                    <IconButton aria-label="cancel replying" size="small" onClick={onCancelReply}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            }
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <TextField
                    label="New Commennt"
                    value={newComment}
                    onChange={onChangeNewComment}
                    fullWidth
                    color="warning"
                    name="comment"
                />
                <IconButton aria-label="send comment" onClick={onConfirm} disabled={!newComment.length}>
                    <SendIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};