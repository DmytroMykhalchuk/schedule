import { TaskDelete } from "@/Componets/Add/TaskDelete";

type PageType = {
    params: {
        id: string,
    },
};

const Page: React.FC<PageType> = ({ params }) => {
    const { id } = params;
    return (
        <TaskDelete taskId={id} backUrl={`/app/add/tasks`} />
    );
};

export default Page;