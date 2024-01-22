import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Comments } from './Elements/Comments';
import { TagItem } from './Elements/TagItem';

type NewCommentsType = {
};

export const NewComments: React.FC<NewCommentsType> = ({ }) => {
    const tags = [
        {
            primaryColor: '#A94BF2',
            secondaryColor: '#F5EDFF',
            tag: 'Research',
            name: 'Survey design',
        },
        {
            primaryColor: '#039F6D',
            secondaryColor: '#E3FFEB',
            tag: 'Strategy',
            name: 'SWOT',

        },
        {
            primaryColor: '#DBB200',
            secondaryColor: '#FCFCE5',
            tag: 'Operations',
            name: 'Structure design',
        },
    ];

    return (
        <>
            <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">New comments</Typography>
                <Comments />
            </Paper>
            <Paper elevation={4} sx={{ p: 2 }}>
                <Stack direction={'row'} spacing={2}>
                    {
                        tags.map((item, index) => (
                            <TagItem
                                key={index}
                                colorPrimary={item.primaryColor}
                                colorSecondary={item.secondaryColor}
                                name={item.name}
                                tag={item.tag}
                            />
                        ))
                    }
                </Stack>
            </Paper>
        </>
    );
};