import { TaskEditPage } from '@/Componets/Add/TaskEditPage';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
    searchParams: {
        task_directory_required?: string;
        is_updated?: string;
    };
};

const Page: React.FC<PageType> = async ({ params, searchParams }) => {
    const { task_directory_required: isDirectoryRequired, is_updated: isUpdated } = searchParams;
    const { id: taskId, locale } = params;

    return (
        <TaskEditPage taskId={taskId} locale={locale}
            isDirectoryRequired={Boolean(isDirectoryRequired)}
            isUpdated={Boolean(isUpdated)}
        />
    )
};

export default Page;