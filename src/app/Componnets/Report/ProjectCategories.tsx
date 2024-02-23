import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { CategoryRecord } from '@/server/actions/types';
import { UIPaper } from '@/ui/UIPaper';
import Typography from '@mui/material/Typography'
import Link from 'next/link';
import { SeeMore } from '../Common/SeeMore';

type ProjectCategoriesType = {
    categories: CategoryRecord[]
};

export const ProjectCategories: React.FC<ProjectCategoriesType> = ({ categories }) => {
    if (categories.length > 4) {
        categories.length = 4;
    }

    return (
        <>
            <UIPaper title="Project categories"
                titleSlot={<SeeMore href='#' />}
            >
                <Grid container spacing={1}>
                    {
                        categories.map((category, index) => (
                            <Grid key={index} md={3} sx={{ p: 1 }}>
                                <Link href='#'>
                                    <Stack sx={{
                                        p: 2,
                                        backgroundColor: category.color,
                                        borderRadius: 4,
                                    }}>
                                        <Typography variant="body1" sx={{ color: category.textColor }}>{category.name}</Typography>
                                    </Stack>
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </UIPaper>
        </>
    );
};