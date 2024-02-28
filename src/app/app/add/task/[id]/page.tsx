import { TaskEditPage } from '@/app/Componnets/Add/TaskEditPage';

type PageType = {
    params: {
        id: string
    },
};

const Page: React.FC<PageType> = async ({ params }) => {

    const { id: taskId } = params;

    return (
        <TaskEditPage taskId={taskId} />
    )
};

export default Page;