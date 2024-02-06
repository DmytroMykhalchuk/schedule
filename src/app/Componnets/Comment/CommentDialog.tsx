
'use client';
import { CommentType } from "@/server/actions/CommentActions";
import Stack from "@mui/material/Stack";
import { CommentItem } from "./Elements/CommentItem";
import { useEffect, useReducer, useState } from "react";
import TextField from '@mui/material/TextField'
import { NewCommentForm } from "./Elements/NewCommentForm";
import { deleteComment, sendComment } from "./actions";
import { TransitionGroup } from 'react-transition-group';
import { Collapse } from "@mui/material";
import styles from './styles.module.scss'
import { PusherComponent } from "./Elements/PusherComponent";

const SET_REPLY_TO = 'SET_REPLY_TO';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const SET_HIGHLIGHT_COMMENT = 'SET_HIGHLIGHT_COMMENT';

const initialState = {
    comments: [] as CommentType[],
    replyTo: {
        name: '',
        commentId: '',
    },
    highlightCommentId: '',
};

type StateType = typeof initialState;
type ActionType = { type: typeof SET_REPLY_TO, name: string, commentId: string } | { type: typeof ADD_COMMENT, comment: CommentType }
    | { type: typeof DELETE_COMMENT, commentId: string }
    | { type: typeof SET_HIGHLIGHT_COMMENT, commentId: string };

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
            const comment = state.comments.find(comment => comment._id === action.comment._id);
            
            if (comment)
                return state;

            return {
                ...state,
                comments: [...state.comments, action.comment],
            };

        }

        case SET_HIGHLIGHT_COMMENT: {
            return {
                ...state,
                highlightCommentId: action.commentId,
            };
        }

        case DELETE_COMMENT: {
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.commentId),
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


    useEffect(() => {
        if (!state.highlightCommentId) return;
        const timerId = setTimeout(() => {
            dispatch({ type: SET_HIGHLIGHT_COMMENT, commentId: '' });
        }, 3000);

        return () => {
            clearTimeout(timerId);
        }
    }, [state.highlightCommentId]);

    const onSendComment = async (text: string) => {
        const response = await sendComment(taskId, text, state.replyTo.commentId);
        if (typeof response.data === 'object') {
            dispatch({ type: ADD_COMMENT, comment: response.data });
        }
    };

    const onReplyTo = (comment: CommentType) => {
        dispatch({ type: SET_REPLY_TO, name: comment.name, commentId: comment._id });
    };

    const onCancelReply = () => {
        dispatch({ type: SET_REPLY_TO, name: '', commentId: '' });
    };

    const onDeleteComment = async (commentId: string) => {
        const response = await deleteComment(taskId, commentId);
        if (response?.code === 200) {
            dispatch({ type: DELETE_COMMENT, commentId });
        }
    };

    const getReplyTargetComment = (commentId: string) => {
        if (!commentId) return;
        return state.comments.find(comment => comment._id === commentId);
    };

    const onHiglightReplyTargetComment = (commentId: string) => {
        dispatch({ type: SET_HIGHLIGHT_COMMENT, commentId });

        const element = document.getElementById(commentId);
        element && element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const addComment = (comment: CommentType) => {
        dispatch({ type: ADD_COMMENT, comment });
    };

    const removeComment = (commentId: string) => {
        dispatch({ type: DELETE_COMMENT, commentId });
    };

    return (
        <>
            <PusherComponent addComment={addComment} removeComment={removeComment} />
            <Stack spacing={2}>
                <TransitionGroup>
                    {
                        state.comments.map((item) => (
                            <Collapse key={item._id} id={item._id} >
                                <div className={state.highlightCommentId === item._id ? styles.highlight : ''}>
                                    <CommentItem
                                        comment={item}
                                        onReply={() => { onReplyTo(item) }}
                                        onDelete={() => onDeleteComment(item._id)}
                                        replyComment={getReplyTargetComment(item.replyId)}
                                        onShowReplyComment={onHiglightReplyTargetComment}
                                    />
                                </div>
                            </Collapse>
                        ))
                    }
                </TransitionGroup>
                <NewCommentForm
                    replydTo={state.replyTo.name}
                    onCancelReply={onCancelReply}
                    onSend={onSendComment} />
            </Stack>
        </>
    );
};