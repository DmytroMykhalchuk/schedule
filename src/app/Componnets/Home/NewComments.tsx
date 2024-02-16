import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Comments } from './Elements/Comments';
import { TagItem } from './Elements/TagItem';
import { getCategoriesList } from '../Add/actions';
import { lightenHexColor } from '@/utlis/lightenHexColor';

type NewCommentsType = {
};

export const NewComments: React.FC<NewCommentsType> = async ({ }) => {
    const categories = await getCategoriesList();
    categories.length = 3;

    return (
        <>
            <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">New comments</Typography>
                <Comments />
            </Paper>
            <Paper elevation={4} sx={{ p: 2 }}>
                <Stack direction={'row'} spacing={2}>
                    {
                        categories.map((item, index) => (
                            <TagItem
                                key={index}
                                colorPrimary={item.textColor}
                                colorSecondary={item.color}
                                name={''}
                                tag={item.name}
                            />
                        ))
                    }
                </Stack>
            </Paper>
        </>
    );
};