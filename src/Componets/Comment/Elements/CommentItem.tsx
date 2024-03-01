import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { CommentType } from "@/server/actions/types";

type CommentItemType = {
    comment: CommentType
    onReply: () => void,
    onDelete: () => void,
    replyComment?: { name: string, text: string, _id: string }
    onShowReplyComment: (commentId: string) => void
    time?: string
};

export const CommentItem: React.FC<CommentItemType> = ({ comment, replyComment, time, onReply, onDelete, onShowReplyComment }) => {

    return (
        <Box>
            {comment?.replyId && replyComment?.name &&
                <ReplyMark name={replyComment.name} text={replyComment.text} onShow={() => onShowReplyComment(replyComment._id)} />
            }
            <Stack direction={'row'} spacing={1} alignItems={'center'} p={2}
                sx={{
                    borderRadius: 4,
                    borderColor: 'warning.main',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    mb: 2,
                }}
            >
                <Avatar src={comment.picture} alt={comment.name} sx={{ width: 60, height: 60 }} />
                <Box flex={1}>
                    <Typography variant="h6" fontWeight={600}>{comment.name}</Typography>
                    <Typography variant="body1">{comment.text}</Typography>
                    <Typography variant="caption">{time}</Typography>
                </Box>
                <Box sx={{
                    opacity: 0,
                    '&:hover': {
                        opacity: 1,
                    }
                }}>
                    <IconButton aria-label="reply" onClick={onReply}>
                        <ReplyIcon />
                    </IconButton>
                    {
                        comment.isOwner &&
                        <IconButton aria-label="delete comments" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </Box>
            </Stack>
        </Box>
    );
};

type ReplyMarkType = {
    name: string,
    text: string
    onShow: () => void
};

export const ReplyMark: React.FC<ReplyMarkType> = ({ name = '', text = '', onShow }) => {
    return (
        <>
            <Typography variant="caption" component={'button'}
                sx={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={onShow}
            >
                Replied to {name}: {text.substring(0, 12)} {text.length > 12 && '...'}
            </Typography>
        </>
    );
};