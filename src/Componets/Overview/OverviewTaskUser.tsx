import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { getCategoriesList } from '../Add/actions';
import { getTaskByUser } from './actions';
import { UIPaper } from '@/ui/UIPaper';
import { TaskByUserRecord, TaskShortType } from '@/server/actions/types';
import { TaskRowItem } from '../MyTasks/TaskRowItem';
import { priorities, priorityStyling, statusStyling, taskDayPropertyStyle } from '@/server/constants';
import { capitalizeFirstLetter } from '@/utlis/capitalizeFirstLetter';

dayjs.locale(uk);
const currentDay = dayjs();

const weekMapNames = {
    [currentDay.day(1).format('DD.MM.YYYY')]: 'monday',
    [currentDay.day(2).format('DD.MM.YYYY')]: 'tuesday',
    [currentDay.day(3).format('DD.MM.YYYY')]: 'wednesday',
    [currentDay.day(4).format('DD.MM.YYYY')]: 'thursday',
    [currentDay.day(5).format('DD.MM.YYYY')]: 'friday',
    [currentDay.format('DD.MM.YYYY')]: 'Today',
    [currentDay.add(1, 'day').format('DD.MM.YYYY')]: 'Tommorow',
    // [currentDay.add(2, 'day').format('DD.MM.YYYY')]: 'Day after tomorrow',
};


type OverviewTaskUserType = {
    authEmail: string,
};

export const OverviewTaskUser: React.FC<OverviewTaskUserType> = async ({ authEmail }) => {
    const taskTree = await getTaskByUser(authEmail);


    const renderList = (): JSX.Element[] => {
        const items = [] as JSX.Element[];

        for (const assignee in taskTree) {
            if (Object.prototype.hasOwnProperty.call(taskTree, assignee)) {
                const element = taskTree[assignee];
                items.push(
                    <UserItemTasks key={assignee} tasks={element.tasks} user={element.user} />
                );
            }
        }

        return items;
    }

    return (
        <UIPaper title="Task by user">
            <Stack spacing={2}>
                {renderList()}
            </Stack>
        </UIPaper>
    );
};

type UserItemTasksType = {
    user: { name: string, picture: string },
    tasks: TaskByUserRecord[],
};

const UserItemTasks: React.FC<UserItemTasksType> = ({ user, tasks }) => {
    return (
        <Stack spacing={2}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Avatar src={user.picture} alt={user.name} sizes='40' sx={{ width: 40, height: 40 }} />
                <Typography variant="body1" fontWeight='600'>{user.name}</Typography>
            </Stack>
            <Stack spacing={1}>
                {tasks.map(item => (
                    <TaskRowItem
                        key={item._id}
                        name={item.name}
                        priority={{
                            label: item.priority,
                            primaryColor: priorityStyling[item.priority]?.primaryColor,
                            secondaryColor: priorityStyling[item.priority]?.secondaryColor,
                        }}
                        status={{
                            label: item.status,
                            primaryColor: statusStyling[item.status]?.primaryColor,
                            secondaryColor: statusStyling[item.status]?.secondaryColor,
                        }}
                        datePoint={{
                            color: taskDayPropertyStyle.hasOwnProperty(weekMapNames[item.dueDate]) ? taskDayPropertyStyle[weekMapNames[item.dueDate]] || '' : taskDayPropertyStyle[item.priority],
                            label: capitalizeFirstLetter(weekMapNames[item.dueDate]) || item.dueDate,
                        }}
                        url={'/app/add/tasks/' + item._id}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
