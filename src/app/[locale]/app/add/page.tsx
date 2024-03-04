import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Paper from '@mui/material/Paper';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { generateDB, removeGenerated } from './actions';
import { useTranslations } from 'next-intl';

const urls = [
    {
        title: 'directories',
        href: '/app/add/directories',
        Icon: ShareIcon,
    },
    {
        title: 'tasks',
        href: '/app/add/tasks',
        Icon: ListAltIcon,
    },
    {
        title: 'team',
        href: '/app/add/team',
        Icon: GroupIcon,
    },
    {
        title: 'invitations',
        href: '/app/add/invitations',
        Icon: HistoryEduIcon,
    },
    {
        title: 'members',
        href: '/app/add/members',
        Icon: PeopleAltIcon,
    },
    {
        title: 'categories',
        href: '/app/add/categories',
        Icon: CategoryIcon,
    },
];

type PageType = {
    params: { locale: string };
};

const Page: React.FC<PageType> = ({ params }) => {
    const { locale } = params;
    const translation = useTranslations('Form');

    return (
        <Stack spacing={2}>
            {
                urls.map((item, index) => (
                    <Link href={`/${locale}${item.href}`} key={index}>
                        <Paper sx={{
                            p: 2,
                            borderRadius: 4,
                            display: 'flex', alignItems: 'center',
                        }}>
                            <item.Icon sx={{ fontSize: '2em', mr: 2 }} />
                            <Typography variant="h4" sx={{ flexGrow: 1 }}>{translation(item.title)}</Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: '2em' }} />
                        </Paper>
                    </Link>
                ))
            }
            <Stack direction={'row'} justifyContent={'end'}>
                <form action={removeGenerated}>
                    <Button variant="text" color="inherit" sx={{ textTransform: 'none' }} type="submit">
                        <Typography variant="body2" color={'grey'}>Clean project</Typography>
                    </Button>
                </form>
                <form action={generateDB}>
                    <Button variant="text" color="inherit" sx={{ textTransform: 'none' }} type="submit">
                        <Typography variant="body2" color={'grey'}>Generate</Typography>
                    </Button>
                </form>
            </Stack>

        </Stack>
    );
};

export default Page;