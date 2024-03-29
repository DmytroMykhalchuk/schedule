import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Comments } from './Elements/Comments';
import { getCategoriesList } from '../Add/actions';
import { PaperTitle } from '../Common/PaperTitle';
import { TagItem } from './Elements/TagItem';

type NewCommentsType = {
    authEmail: string;
    locale: string;
};

export const NewComments: React.FC<NewCommentsType> = async ({ authEmail, locale }) => {
    const categories = await getCategoriesList(authEmail);
    categories.length = 3;

    return (
        <>
            <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
                <div>
                    <PaperTitle pageName='AppHome' titleKey='new_comments' />
                    <Comments authEmail={authEmail} locale={locale} />
                </div>
            </Paper>
            <Paper elevation={4} sx={{ p: 2 }}>
                <PaperTitle pageName='AppHome' titleKey='categories' />
                <Stack direction={'row'} spacing={2}>
                    {
                        categories.map((item, index) => (
                            <TagItem
                                key={index}
                                colorPrimary={item.textColor}
                                colorSecondary={item.color}
                                name={''}
                                tag={item.name}
                                categoryId={item._id}
                            />
                        ))
                    }
                </Stack>
            </Paper>
        </>
    );
};