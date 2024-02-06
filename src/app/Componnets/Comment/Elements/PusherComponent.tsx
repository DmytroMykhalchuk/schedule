import { CommentType } from '@/server/actions/CommentActions';
import { channelPrefixName, newCommentEventName, removedCommentEventName } from '@/server/constants';
import { getCookieValue } from '@/utlis/getCookieValue';
import Pusher from 'pusher-js';
import { useEffect } from 'react';

Pusher.logToConsole = true;

const pusher = new Pusher('90149ab3e623050894c1', {
    cluster: 'eu'
});

type PusherComponentType = {
    addComment: (comment: CommentType) => void,
    removeComment: (commentId: string) => void,
};

export const PusherComponent: React.FC<PusherComponentType> = ({ addComment, removeComment }) => {
    const projectId = getCookieValue('target_project');

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