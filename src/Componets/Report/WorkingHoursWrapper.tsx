import { useTranslations } from "next-intl";
import { TotalWorkingHours } from "./Elements/TotalWorkingHours";
import { WorkHours } from "@/server/actions/types";

type WorkingHoursWrapperType = {
    weekWorkHours?: WorkHours;
    monthWorkHours?: WorkHours;
};

export const WorkingHoursWrapper: React.FC<WorkingHoursWrapperType> = ({ weekWorkHours, monthWorkHours }) => {
    const translation = useTranslations('Report');


    return (
        <TotalWorkingHours translate={{
            title: translation('total_working_hours.title'),
            avarage: translation('total_working_hours.avg_per_month', { hours: 'value' }),
            hours: translation('total_working_hours.hours'),
            hoursShortLetter: translation('total_working_hours.hour_short'),
            year: translation('total_working_hours.year'),
            week: translation('total_working_hours.week'),
        }}
            monthWorkHours={monthWorkHours}
            weekWorkHours={weekWorkHours}
        />
    );
};