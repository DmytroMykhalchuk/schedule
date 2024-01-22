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
};

export const BigCalendarWrapper: React.FC<BigCalendarWrapperType> = ({ type = 'week' }) => {
    console.log({type})
    const TargetCalendar = calendars[type];
    return (
        <>
            <TargetCalendar/>
        </>
    );
};