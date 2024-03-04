import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CategoryRecord } from '@/server/actions/types';
import { UIPaper } from '@/ui/UIPaper';
import { useTranslations } from 'next-intl';

type ProjectCategoriesType = {
    categories: CategoryRecord[];
    locale: string;
};

export const ProjectCategories: React.FC<ProjectCategoriesType> = ({ categories, locale }) => {
    // if (categories.length > 4) {
    //     categories.length = 4;
    // }

    const translation = useTranslations('Report');

    return (
        <>
            <UIPaper title={translation('project_categories')}>
                <Grid container spacing={1}>
                    {
                        categories.map((category, index) => (
                            <Grid key={index} md={3} sx={{ p: 1 }}>
                                {/* <Link href={`/${locale}/app/directories/${category._id}/kaban-dashboard`}> */}
                                    <Stack sx={{
                                        p: 2,
                                        backgroundColor: category.color,
                                        borderRadius: 4,
                                    }}>
                                        <Typography variant="body1" sx={{ color: category.textColor }}>{category.name}</Typography>
                                    </Stack>
                                {/* </Link> */}
                            </Grid>
                        ))
                    }
                </Grid>
            </UIPaper>
        </>
    );
};