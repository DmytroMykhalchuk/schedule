import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type CommentContainerType = {
};

export const CommentContainer: React.FC<CommentContainerType> = ({ }) => {
    return (
        <>
            <TextField
                multiline
                minRows={3}
                color='warning'
                fullWidth
                sx={{
                    borderWidth: 2,
                    backgroundColor: '#f1f1f1',
                }}
                placeholder={'No comments yet'}
                name='comment'
            />
        </>
    );
};