import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styles from './styles.module.scss';
import Link from "next/link";
import cn from 'classnames';
import { useTranslations } from "next-intl";

export type CalendarType = 'day' | 'week' | 'month';

type HeaderNavigationType = {
    type?: CalendarType;
    locale: string;
};

export const HeaderNavigation: React.FC<HeaderNavigationType> = ({ type = 'week', locale }) => {
    const translation = useTranslations('Calendar');
    const navigations = [
        {

            path: `/${locale}/app/calendar/day`,
            type: 'day',
        },
        {
            path: `/${locale}/app/calendar/week`,
            type: 'week',
        },
        {
            path: `/${locale}/app/calendar/month`,
            type: 'month',
        }
    ];

    return (
        <Stack className={styles.navigationHeader} direction={'row'} sx={{ backgroundColor: 'background.paper' }}>
            {
                navigations.map((item, index) => (
                    <Box
                        sx={{ backgroundColor: type === item.type ? 'peachy.light' : undefined }}
                        borderRadius={4}
                        key={index}
                    >
                        <Link
                            className={cn(styles.link)}
                            href={item.path}>
                            {translation(`navigation.` + item.type)}
                        </Link>
                    </Box>
                ))
            }
        </Stack>
    );
};

