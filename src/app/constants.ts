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
}

export const menuList: MenuItemTyp[] = [{
    path: '/app/',
    Icon: HomeIcon,
},
{
    path: '/app/calendar/',
    Icon: CalendarMonthIcon,
},
{
    path: '/app/design/',
    Icon: DesignServicesIcon,
},
{
    path: '/app/charts/',
    Icon: BubbleChartIcon,
},
{
    path: '/app/add/',
    Icon: AddBoxIcon,
},
]