import { DayTasks } from "./DayTasks";
import { MonthCalendar } from "./MonthCalendar";
import { WeekCalendar } from "./WeekCalendar";
import { CalendarType } from "../HeaderNavigation";

const calendars = {
    day: DayTasks,
    week: WeekCalendar,
    month: MonthCalendar,
};

type BigCalendarWrapperType = {
    type?: CalendarType
    date?: string
    authEmail: string,
    locale: string;
};

export const BigCalendarWrapper: React.FC<BigCalendarWrapperType> = ({ type = 'week', date, authEmail, locale }) => {
    const TargetCalendar = calendars[type];
    return (
        <TargetCalendar date={date} authEmail={authEmail} locale={locale} />
    );
};