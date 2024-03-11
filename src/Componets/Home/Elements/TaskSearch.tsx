import { TaskInfoRecord } from "@/server/types/taskTypes";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

type TaskSearchType = {
    locale: string;
    task: TaskInfoRecord;
};

export const TaskSearch: React.FC<TaskSearchType> = ({ locale, task }) => {
    return (
        <Link href={`/${locale}/app/add/tasks/${task.taskId}`}>
            <Stack direction={'row'} p={1} sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'inherit', borderRadius: 3 }}>
                <Typography variant="body1" flex={1}>{task.name}</Typography>
            </Stack>
        </Link>
    );
};