import { CommentType } from "@/server/actions/CommentActions";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';

type CommentItemType = {
    comment: CommentType
    onReply: () => void,
};

export const CommentItem: React.FC<CommentItemType> = ({ comment, onReply }) => {

    return (
        <Stack direction={'row'} spacing={1} alignItems={'center'} p={2}
            sx={{
                borderRadius: 4,
                borderColor: 'warning.main',
                borderWidth: 2,
                borderStyle: 'solid',
            }}
        >
            <Avatar src={comment.picture} alt={comment.name} sx={{ width: 60, height: 60 }} />
            <Box flex={1}>
                <Typography variant="h6" fontWeight={600}>{comment.name}</Typography>
                <Typography variant="body1">{comment.text}</Typography>
            </Box>
            <Box sx={{
                // opacity: 0,
                // '&:hover': {
                //     opacity: 1,
                // }
            }}>
                <IconButton aria-label="reply" onClick={onReply}>
                    <ReplyIcon />
                </IconButton>
                {
                    comment.isOwner &&
                    <IconButton aria-label="delete comments" onClick={() => { }}>
                        <DeleteIcon />
                    </IconButton>
                }
            </Box>
        </Stack>
    );
};