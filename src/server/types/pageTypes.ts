import { CategoryRecord, CommentType } from "../actions/types";
import { DirectoryRecord } from "./directoryTypes";
import { TaskInfoDB, TaskInfoRecord } from "./taskTypes";
import { UserInfoRecord } from "./userTypes";

export type SearchAnwserType = {
    categories: CategoryRecord[],
    tasks: TaskInfoRecord[],
    directories: DirectoryRecord[],
    invitations: string[],
    users: UserInfoRecord[],
    comments: CommentType[],
}