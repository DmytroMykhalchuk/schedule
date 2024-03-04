import { TaskEditPage } from '@/Componets/Add/TaskEditPage';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {

    const { id: taskId, locale } = params;

    return (
        <TaskEditPage taskId={taskId} locale={locale} />
    )
};

export default Page;