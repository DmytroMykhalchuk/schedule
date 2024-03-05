import { TaskEditPage } from '@/Componets/Add/TaskEditPage';

type PageType = {
    params: {
        id: string;
        locale: string;
    },
    searchParams: {
        task_directory_required?: string;
    };
};

const Page: React.FC<PageType> = ({ params, searchParams }) => {
    const { locale, id: taskId } = params;
    const { task_directory_required: isDirectoryRequired } = searchParams;


    return (
        <TaskEditPage taskId={taskId} locale={locale} isDirectoryRequired={Boolean(isDirectoryRequired)} />
    )
};

export default Page;