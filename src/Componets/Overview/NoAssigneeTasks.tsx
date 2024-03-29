import dayjs from 'dayjs';
import uk from 'dayjs/locale/uk';
import { capitalizeFirstLetter } from '@/utlis/capitalizeFirstLetter';
import { priorityStyling, statusStyling, taskDayPropertyStyle } from '@/server/constants';
import { TaskByUserDB } from '@/server/actions/types';
import { TaskRowItem } from '../MyTasks/TaskRowItem';
import { UIPaper } from '@/ui/UIPaper';
import { useTranslations } from 'next-intl';

type NoAssigneeTasksType = {
    tasks: TaskByUserDB[];
    locale: string;
};

export const NoAssigneeTasks: React.FC<NoAssigneeTasksType> = ({ tasks, locale }) => {
    locale === 'uk' && dayjs.locale(uk);
    
    const translation = useTranslations('MyTasks');
    const currentDay = dayjs();

    const weekMapNames = {
        [currentDay.day(1).format('DD.MM.YYYY')]: currentDay.day(1).format('dddd'),
        [currentDay.day(2).format('DD.MM.YYYY')]: currentDay.day(2).format('dddd'),
        [currentDay.day(3).format('DD.MM.YYYY')]: currentDay.day(3).format('dddd'),
        [currentDay.day(4).format('DD.MM.YYYY')]: currentDay.day(4).format('dddd'),
        [currentDay.day(5).format('DD.MM.YYYY')]: currentDay.day(5).format('dddd'),
        [currentDay.format('DD.MM.YYYY')]: translation('today'),
        [currentDay.add(1, 'day').format('DD.MM.YYYY')]: translation('tomorrow'),
    };

    return (
        <UIPaper title={translation('no_assignes_tasks')}>
            {tasks.map((item, index) => (
                <TaskRowItem
                    key={index}
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
        </UIPaper>
    );
};