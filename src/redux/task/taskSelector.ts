import { AppStateType } from "../store";

export const getTaskFormAssignee = (state: AppStateType) => {
    return state.task.taskForm.assignee;
};