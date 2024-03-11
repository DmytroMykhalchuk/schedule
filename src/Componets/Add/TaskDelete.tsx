import { ReactNode } from "react";
import { deleteTask } from "./actions";
import { getUserSessionAndEmail } from "../actions";
import { DeleteDialog } from "../Common/DeleteDialog";

type TaskDeleteType = {
    taskId: string,
    backUrl: string,
};

export const TaskDelete: React.FC<TaskDeleteType> = ({ backUrl, taskId }) => {
    return (
        <DeleteDialog
            cancelHref={backUrl}
            FormWrapper={(props = {}) => <FormWrapper taskId={taskId} {...props} />}
        />
    );
};

type FormWrapperType = {
    children?: ReactNode
    taskId: string
}

const FormWrapper: React.FC<FormWrapperType> = async ({ children, taskId }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <form action={deleteTask}>
            <input type="hidden" name="task_id" value={taskId} />
            <input type="hidden" name="auth_email" value={authEmail} />
            {children}
        </form>
    );
};