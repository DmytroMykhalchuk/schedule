import AddBoxIcon from '@mui/icons-material/AddBox';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import HomeIcon from '@mui/icons-material/Home';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type MenuItemTyp = {
    path: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    activeChecks: string[],
}

export const menuList: MenuItemTyp[] = [
    {
        path: '/app/',
        Icon: HomeIcon,
        activeChecks: ['/app/my-tasks/', '/app/', '/app/directories/'],
    },
    {
        path: '/app/calendar/',
        Icon: CalendarMonthIcon,
        activeChecks: ['/app/calendar/', '/app/calendar/month/', '/app/calendar/week/'],
    },
    {
        path: '/app/overview/',
        Icon: DesignServicesIcon,
        activeChecks: ['/app/overview/'],
    },
    {
        path: '/app/charts/',
        Icon: BubbleChartIcon,
        activeChecks: ['/app/charts/'],
    },
    {
        path: '/app/add/',
        Icon: AddBoxIcon,
        activeChecks: ['/app/add/', '/app/add/directory/', '/app/add/tasks/', '/app/add/team/', '/app/add/invitations/', '/app/add/members/', '/app/add/categories/'],
    },
];

export const availableLanguages = ['en', 'uk'];