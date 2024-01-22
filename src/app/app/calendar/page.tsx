import { BigCalendarWrapper } from "@/app/Componnets/Calendar/BigCalendarWrapper";
import { CalendarLayout } from "@/app/Componnets/Calendar/CalendarLayout";
import { HeaderNavigation } from "@/app/Componnets/Calendar/HeaderNavigation";
import { HeaderLayout } from "@/app/Componnets/Layouts/HeaderLayout";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

type PageType = {
};

const Page: React.FC<PageType> = () => {
    return (
        <CalendarLayout />
    );
};

export default Page;