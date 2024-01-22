import Box from "@mui/material/Box";
import { HeaderLayout } from "../Layouts/HeaderLayout";
import { CalendarType, HeaderNavigation } from "./HeaderNavigation";
import { BigCalendarWrapper } from "./BigCalendarWrapper";
import dayjs from "dayjs";
import uk from 'dayjs/locale/uk';
dayjs.locale(uk)

type CalendarLayoutType = {
    type?: CalendarType
};

export const CalendarLayout: React.FC<CalendarLayoutType> = ({ type }) => {

    return (
        <>
            <Box>
                <HeaderLayout
                    title="Calendar"
                    subtitle={dayjs().format('MMMM D, YYYY')}
                    slot={<HeaderNavigation type={type} />}
                />
            </Box>
            <BigCalendarWrapper type={type} />
        </>
    );
};