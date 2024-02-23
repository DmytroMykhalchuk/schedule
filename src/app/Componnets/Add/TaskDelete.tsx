import { DeleteDialog } from "@/app/Componnets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteTask } from "./actions";

type TaskDeleteType = {
    taskId: string,
    backUrl: string,
};

export const TaskDelete: React.FC<TaskDeleteType> = ({ backUrl, taskId }) => {

    return (
        <DeleteDialog
            cancelHref={backUrl}
            content='It will be deleted completely. Are you sure?'
            title="Confrim action"
            FormWrapper={(props = {}) => <FormWrapper taskId={taskId} {...props} />}
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