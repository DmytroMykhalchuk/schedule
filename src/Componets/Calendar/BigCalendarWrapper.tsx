import { DayTasks } from "./Elements/DayTasks";
import { MonthCalendar } from "./Elements/MonthCalendar";
import { WeekCalendar } from "./Elements/WeekCalendar";
import { CalendarType } from "./HeaderNavigation";

const calendars = {
    day: DayTasks,
    week: WeekCalendar,
    month: MonthCalendar,
};

type BigCalendarWrapperType = {
    type?: CalendarType
    date?: string
    authEmail: string,
};

export const BigCalendarWrapper: React.FC<BigCalendarWrapperType> = ({ type = 'week', date, authEmail }) => {
    const TargetCalendar = calendars[type];
    return (
        <>
            <TargetCalendar date={date} authEmail={authEmail} />
        </>
    );
};