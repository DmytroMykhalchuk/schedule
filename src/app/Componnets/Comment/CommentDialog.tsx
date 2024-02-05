
'use client';
import { CommentType } from "@/server/actions/CommentActions";
import Stack from "@mui/material/Stack";
import { CommentItem } from "./Elements/CommentItem";
import { useReducer, useState } from "react";
import TextField from '@mui/material/TextField'
import { NewCommentForm } from "./Elements/NewCommentForm";
import { sendComment } from "./actions";

const SET_REPLY_TO = 'SET_REPLY_TO';
const ADD_COMMENT = 'ADD_COMMENT';

const initialState = {
    comments: [] as CommentType[],
    replyTo: {
        name: '',
        commentId: '',
    },
};

type StateType = typeof initialState;
type ActionType = { type: typeof SET_REPLY_TO, name: string, commentId: string } | { type: typeof ADD_COMMENT, comment: CommentType };

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case SET_REPLY_TO: {
            return {
                ...state,
                replyTo: {
                    name: action.name,
                    commentId: action.commentId,
                }
            };
        }

        case ADD_COMMENT: {
            return {
                ...state,
                comments: [...state.comments, action.comment],
            };
        }

        default: {
            return state;
        }
    }
};

type CommentDialogType = {
    comments: CommentType[],
    taskId: string
};

export const CommentDialog: React.FC<CommentDialogType> = ({ comments, taskId }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState, comments: comments as CommentType[] });

    const onSendComment = async (text: string) => {
        const response = await sendComment(taskId, text, state.replyTo.commentId);
        if (typeof response.data === 'object') {
            dispatch({ type: ADD_COMMENT, comment: response.data });
        }
    }

    const onReplyTo = (comment: CommentType) => {
        dispatch({ type: SET_REPLY_TO, name: comment.name, commentId: comment._id });
    };

    const onCancelReply = () => {
        dispatch({ type: SET_REPLY_TO, name: '', commentId: '' });
    };

    return (
        <>
            <Stack spacing={2}>
                {
                    state.comments.map((item) => (
                        <CommentItem key={item._id} comment={item} onReply={() => { onReplyTo(item) }} />
                    ))
                }
                <NewCommentForm
                    replydTo={state.replyTo.name}
                    onCancelReply={onCancelReply}
                    onSend={onSendComment} />
            </Stack>
        </>
    );
};