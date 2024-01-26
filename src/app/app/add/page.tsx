import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const urls = [
    {
        title: 'Directory',
        href: '/app/add/directory'
    },
    {
        title: 'Task',
        href: '/app/add/task',
    }
];

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <Stack spacing={2}>
            {
                urls.map((item, index) => (
                    <Link href={item.href}>
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

        </Stack>
    );
};

export default Page;