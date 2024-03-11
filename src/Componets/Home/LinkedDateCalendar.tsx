'use client';
import Badge from '@mui/material/Badge';
import dayjs, { Dayjs } from 'dayjs';
import uk from 'dayjs/locale/uk';
import updateLocale from 'dayjs/plugin/updateLocale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { getCookieValue } from '@/utlis/getCookieValue';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { projectIdCookieKey } from '@/server/constants';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';

dayjs.extend(updateLocale)

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
};

function fakeFetch(date: Dayjs, authEmail: string) {
  const formattedDate = date.format('DD.MM.YYYY');
  const targetProjectId = getCookieValue(projectIdCookieKey);

  return fetch(`/api/home-calendar?date=${formattedDate}`, {
    next: {
      revalidate: 10
    },
    headers: {
      'x-project': targetProjectId,
      'x-user': authEmail,
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    return data?.data?.days;
  })
    .catch(err => {


    }).finally(() => {
      // signal.onabort = () => {
      // };
    })
};

const initialValue = dayjs();

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color="warning"
      variant='dot'
      invisible={!isSelected}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

export const LinkedDateCalendar = ({ authEmail, locale }: { authEmail: string, locale: string }) => {
  locale === 'uk' && dayjs.locale(uk);

  const router = useRouter();
  const theme = useTheme();

  const colorWarning = theme.palette.warning.main;

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([] as number[]);

  const [currentDay, setCurrentDay] = useState(dayjs());

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, authEmail)
      .then((daysToHighlight) => {
        Array.isArray(daysToHighlight) && setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const onRedirectCalendar = () => {
    router.push('/app/calendar');
  };

  return (
    // <Link href="/app/calendar">
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk"
    >
      <DateCalendar
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        views={['day']}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          calendarHeader: {
          },
          day: {
            highlightedDays,

          } as any,
        }}
        value={currentDay}
        onChange={onRedirectCalendar}
        sx={{
          '& .MuiPickersDay-today': {
            backgroundColor: colorWarning + ' !important',
          }
        }}
      />
    </LocalizationProvider>
    // </Link>
  );
};