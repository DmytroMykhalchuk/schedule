import { TaskEditPage } from '@/Componets/Add/TaskEditPage';

type PageType = {
    params: {
        id: string
    },
};

const Page: React.FC<PageType> = ({ params }) => {
    const { id: taskId } = params;

    return (
        <TaskEditPage taskId={taskId} />
    )
};

export default Page;