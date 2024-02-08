'use client';
import { useRef, useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import uk from 'dayjs/locale/uk'
import updateLocale from 'dayjs/plugin/updateLocale'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';
import { cookies } from 'next/headers';
import { getCookieValue } from '@/utlis/getCookieValue';
import { authCookieKey, projectIdCookieKey } from '@/server/constants';

dayjs.locale(uk);
dayjs.extend(updateLocale)
dayjs.updateLocale('uk', {});

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
};

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  const formattedDate = date.format('DD.MM.YYYY');
  const targetProjectId = getCookieValue(projectIdCookieKey);
  const sessionId = getCookieValue(authCookieKey);

  return fetch(`/api/home-calendar?date=${formattedDate}&project_id=${targetProjectId}&session_id=${sessionId}`, {
    next: {
      revalidate: 1
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    return data?.days;
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

export const LinkedDateCalendar = () => {
  const router = useRouter();
  const theme = useTheme();

  const colorWarning = theme.palette.warning.main;

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const [currentDay, setCurrentDay] = useState(dayjs());

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
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