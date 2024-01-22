import Stack from "@mui/material/Stack";
import styles from './styles.module.scss';
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getRequestURL } from "@/utlis/getUrl";
import { useRouter } from "next/navigation";
import cn from 'classnames';

export type CalendarType = 'day' | 'week' | 'month';


const navigations = [
    {

        path: '/app/calendar/day',
        type: 'day',
    },
    {
        path: '/app/calendar/week',
        type: 'week',
    },
    {
        path: '/app/calendar/month',
        type: 'month',
    }
];

type HeaderNavigationType = {
    type?: CalendarType
};

export const HeaderNavigation: React.FC<HeaderNavigationType> = ({ type = 'week' }) => {
    console.log(type)
    return (
        <Stack className={styles.navigationHeader} direction={'row'}>
            {
                navigations.map((item, index) => (
                    <Link
                        key={index}
                        className={cn(styles.link, type === item.type && styles.link__active)}
                        href={item.path}>
                        {item.type[0].toUpperCase()}{item.type.substring(1)}
                    </Link>
                ))
            }
        </Stack>
    );
};

