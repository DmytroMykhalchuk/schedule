import { DeleteDialog } from "@/app/Componnets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteTask } from "../actions";

type PageType = {
    params: {
        id: string,
    },
};

const Page: React.FC<PageType> = ({ params }) => {
    const { id } = params;
    return (
        <DeleteDialog
            cancelHref={"/app/my-tasks/" + id}
            content='It will be deleted completely. Are you sure?'
            title="Confrim action"
            FormWrapper={(props = {}) => <FormWrapper taskId={id} {...props} />}
        />
    );
};

type FormWrapperType = {
    children?: ReactNode
    taskId: string
}

const FormWrapper: React.FC<FormWrapperType> = ({ children, taskId }) => {
    return (
        <form action={deleteTask}>
            <input type="hidden" name="task_id" value={taskId} />
            {children}
        </form>
    );
};

export default Page;