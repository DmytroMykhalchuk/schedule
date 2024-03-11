import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';

type CommentBoxType = {
};

export const CommentBox: React.FC<CommentBoxType> = ({ }) => {
    const translation = useTranslations('MyTasks');

    return (
        <TextField
            multiline
            minRows={3}
            color='warning'
            fullWidth
            sx={{
                borderWidth: 2,
                backgroundColor: 'peachy.main',
                borderRadius: 4,
                "& .MuiInputBase-root": {
                    borderRadius: 4,
                },
            }}
            placeholder={translation('no_comments')}
            name='comment'
        />
    );
};1