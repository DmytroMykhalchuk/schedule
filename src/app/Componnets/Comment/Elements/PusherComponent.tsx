'use client';
import Pusher from 'pusher-js';
import { channelPrefixName, newCommentEventName, removedCommentEventName } from '@/server/constants';
import { CommentType } from '@/server/actions/CommentActions';
import { useEffect } from 'react';

Pusher.logToConsole = true;

const pusher = new Pusher('90149ab3e623050894c1', {
    cluster: 'eu'
});

type PusherComponentType = {
    addComment: (comment: CommentType) => void,
    removeComment: (commentId: string) => void,
    projectId: string
};

export const PusherComponent: React.FC<PusherComponentType> = ({ addComment, removeComment, projectId }) => {

    useEffect(() => {
        if (!pusher || !projectId) return;
        const newChannel = pusher.subscribe(`${channelPrefixName}${projectId}`);

        if (newChannel) {
            newChannel.bind(newCommentEventName, (data: { comment: CommentType }) => {
                data.comment && addComment(data.comment);
            });

            newChannel.bind(removedCommentEventName, (data: { commentId: string }) => {
                removeComment(data.commentId);
            });

            return () => {
                newChannel.unbind_all();
                newChannel.unsubscribe();
            };
        }
    }, []);

    return (
        <>
        </>
    );
};