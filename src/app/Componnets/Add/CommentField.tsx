import TextField from '@mui/material/TextField';

type CommentFieldType = {
};

export const CommentField: React.FC<CommentFieldType> = ({ }) => {
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