import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button'
import { generateDB, removeGenerated } from '@/app/app/add/actions'

const urls = [
    {
        title: 'Directory',
        href: '/app/add/directory'
    },
    {
        title: 'Task',
        href: '/app/add/task',
    },
    {
        title: 'Team',
        href: '/app/add/team'
    },
    {
        title: 'Invitations',
        href: '/app/add/invitations',
    },
    {
        title: 'Members',
        href: '/app/add/members',
    },
    {
        title: 'Category',
        href: '/app/add/categories',
    }
];

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <Stack spacing={2}>
            {
                urls.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <Paper sx={{
                            p: 2,
                            borderRadius: 4,
                            display: 'flex', alignItems: 'center',
                        }}>
                            <Typography variant="h4" sx={{ flexGrow: 1 }}>{item.title}</Typography>
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