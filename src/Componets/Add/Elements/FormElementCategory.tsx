import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getCategoriesList } from '../actions';
import { FormSelect } from '../../Common/FormSelect';
import { defaultCategory } from '@/server/constants';

type FormElementCategoryType = {
    defaultCategoryId?: string;
    authEmail: string;
    translatedName: string;
};

export const FormElementCategory: React.FC<FormElementCategoryType> = async ({ defaultCategoryId, authEmail, translatedName }) => {
    const categories = await getCategoriesList(authEmail);

    const preparedCategories = defaultCategoryId
        ? [...categories]
        : [defaultCategory, ...categories];

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>{translatedName}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={9} alignItems={'self-start'}>
                <Stack alignItems={'start'} justifyItems={'start'}>
                    <Box minWidth={120}>
                        <FormSelect
                            isFullWidth
                            name='category_id'
                            defaultValue={defaultCategoryId || defaultCategory._id}
                        >
                            {
                                preparedCategories.map((category) => (
                                    <MenuItem value={category._id} key={category._id} sx={{ p: 0 }}>
                                        <Chip
                                            label={category.name}
                                            sx={{
                                                p: 0,
                                                backgroundColor: category.color,
                                                color: category.textColor,
                                            }}
                                        />
                                    </MenuItem>
                                ))
                            }
                        </FormSelect>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
};