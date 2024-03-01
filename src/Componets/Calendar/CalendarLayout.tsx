import Box from "@mui/material/Box";
import { HeaderLayout } from "../Layouts/HeaderLayout";
import { CalendarType, HeaderNavigation } from "./HeaderNavigation";
import { BigCalendarWrapper } from "./BigCalendarWrapper";
import dayjs from "dayjs";
import uk from 'dayjs/locale/uk';
import { getUserSessionAndEmail } from "../actions";
dayjs.locale(uk)

type CalendarLayoutType = {
    type?: CalendarType
    date?: string
};

export const CalendarLayout: React.FC<CalendarLayoutType> = async ({ type, date }) => {
    const { authEmail, session } = await getUserSessionAndEmail();

    return (
        <>
            <Box>
                <HeaderLayout
                    title="Calendar"
                    subtitle={dayjs().format('MMMM D, YYYY')}
                    slot={<HeaderNavigation type={type} />}
                    authUser={{
                        name: session?.user?.name as string,
                        image: session?.user?.image as string,
                    }}
                />
            </Box>
            <BigCalendarWrapper type={type} date={date} authEmail={authEmail}/>
        </>
    );
};