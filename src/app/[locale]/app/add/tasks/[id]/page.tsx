import { TaskEditPage } from '@/Componets/Add/TaskEditPage';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
    searchParams: {
        task_directory_required?: string;
        is_updated?: string;
        wrong_data?: string;
    };
};

const Page: React.FC<PageType> = async ({ params, searchParams }) => {
    const {
        task_directory_required: isDirectoryRequired,
        is_updated: isUpdated,
        wrong_data: isNotAvailableDate,
    } = searchParams;

    const { id: taskId, locale } = params;

    return (
        <TaskEditPage taskId={taskId} locale={locale}
            isDirectoryRequired={Boolean(isDirectoryRequired)}
            isUpdated={Boolean(isUpdated)}
            isNotAvailableDate={Boolean(isNotAvailableDate)}
        />
    )
};

export default Page;

//todo add function closing defacto