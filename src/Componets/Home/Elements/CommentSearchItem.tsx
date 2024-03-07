import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { Avatar, Typography } from '@mui/material';
import { CommentType } from '@/server/actions/types';

type CommentSearchItemType = {
    comment: CommentType;
    locale: string;
};

export const CommentSearchItem: React.FC<CommentSearchItemType> = ({ comment, locale }) => {
    return (
        <Link href={`/${locale}/app/add/tasks/${comment.taskId}`}>

            <Stack direction={'row'} spacing={1}>
                <Avatar src={comment.picture} />
                <Box>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'cenrer'} spacing={1}>
                        <Typography variant="subtitle2">{comment.name}</Typography>
                        <Typography variant="caption">{dayjs(comment.createdAt).format('DD.MM.YYYY')}</Typography>
                    </Stack>
                    <Typography variant="subtitle2">{comment.text}</Typography>
                </Box>
            </Stack>
        </Link>
    );
};