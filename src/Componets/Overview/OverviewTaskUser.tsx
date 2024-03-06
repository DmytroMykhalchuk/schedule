import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { getCategoriesList } from '../Add/actions';
import { getTaskByUser } from './actions';
import { UIPaper } from '@/ui/UIPaper';
import { TaskByUserRecord, TaskShortType, TaskTree } from '@/server/actions/types';
import { TaskRowItem } from '../MyTasks/TaskRowItem';
import { priorities, priorityStyling, statusStyling, taskDayPropertyStyle } from '@/server/constants';
import { capitalizeFirstLetter } from '@/utlis/capitalizeFirstLetter';
import { useTranslations } from 'next-intl';

dayjs.locale(uk);
const currentDay = dayjs();



type OverviewTaskUserType = {
    locale: string;
    taskTree: TaskTree;
};

export const OverviewTaskUser: React.FC<OverviewTaskUserType> = ({ taskTree, locale }) => {
    const translation = useTranslations('MyTasks');

    const weekMapNames = {
        [currentDay.day(1).format('DD.MM.YYYY')]: currentDay.day(1).format('dddd'),
        [currentDay.day(2).format('DD.MM.YYYY')]: currentDay.day(2).format('dddd'),
        [currentDay.day(3).format('DD.MM.YYYY')]: currentDay.day(3).format('dddd'),
        [currentDay.day(4).format('DD.MM.YYYY')]: currentDay.day(4).format('dddd'),
        [currentDay.day(5).format('DD.MM.YYYY')]: currentDay.day(5).format('dddd'),
        [currentDay.format('DD.MM.YYYY')]: translation('today'),
        [currentDay.add(1, 'day').format('DD.MM.YYYY')]: translation('tomorrow'),
    };

    const renderList = (): JSX.Element[] => {
        const items = [] as JSX.Element[];

        for (const assignee in taskTree) {
            if (Object.prototype.hasOwnProperty.call(taskTree, assignee)) {
                const element = taskTree[assignee];
                items.push(
                    <UserItemTasks key={assignee} tasks={element.tasks} user={element.user} locale={locale} weekMapNames={weekMapNames} />
                );
            }
        }

        return items;
    }

    return (
        <UIPaper title={translation('task_by_user_title')}>
            <Stack spacing={2}>
                {renderList()}
            </Stack>
        </UIPaper>
    );
};

type UserItemTasksType = {
    user: { name: string, picture: string };
    tasks: TaskByUserRecord[];
    locale: string;
    weekMapNames: { [dateMark: string]: string };
};

const UserItemTasks: React.FC<UserItemTasksType> = ({ user, tasks, locale, weekMapNames }) => {
    const translation = useTranslations('MyTasks');
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
                            label: translation('priorities.' + item.priority),
                            primaryColor: priorityStyling[item.priority]?.primaryColor,
                            secondaryColor: priorityStyling[item.priority]?.secondaryColor,
                        }}
                        status={{
                            label: translation('statuses.' + item.status),
                            primaryColor: statusStyling[item.status]?.primaryColor,
                            secondaryColor: statusStyling[item.status]?.secondaryColor,
                        }}
                        datePoint={{
                            //@ts-ignore
                            color: taskDayPropertyStyle.hasOwnProperty(weekMapNames[item.dueDate]) ? taskDayPropertyStyle[weekMapNames[item.dueDate]] || '' : taskDayPropertyStyle[item.priority],
                            label: capitalizeFirstLetter(weekMapNames[item.dueDate]) || item.dueDate,
                        }}
                        url={`/${locale}/app/add/tasks/${item._id}`}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
