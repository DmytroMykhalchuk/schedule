import dayjs from "dayjs";
import { getLastComments } from "../actions";
import { CommentItem } from "./CommentItem";
import relativeTimePlugin from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTimePlugin);
dayjs.locale('uk');

type CommentsType = {
    authEmail: string;
    locale: string;
};

export const Comments: React.FC<CommentsType> = async ({ authEmail, locale }) => {
    const comments = await getLastComments(authEmail);
    const now = dayjs();

    return (
        <>
            {comments.map((item, index) => {
                const createdAt = dayjs(item.createdAt);
                const timeDiff = createdAt ? now.to(createdAt) : undefined;
                return (
                    <CommentItem
                        key={index}
                        message={item.text}
                        personName={item.name}
                        projectName={item?.taskId?.name}
                        avatar={item.picture}
                        taskId={item.taskId?._id.toString()}
                        timeDiff={timeDiff}
                        locale={locale}
                    />
                )
            })}
        </>
    );
};