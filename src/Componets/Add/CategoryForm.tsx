import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { categoryColors } from '@/server/constants';
import { UIInputField } from '../UI/UIInputField';
import { useTranslations } from 'next-intl';

type CategoryFormType = {
    color?: string;
    name?: string;
};

export const CategoryForm: React.FC<CategoryFormType> = ({ color, name }) => {
    const translation = useTranslations('Form');
    return (
        <Stack spacing={2}>
            <UIInputField
                label={translation('category_form.category_placeholder')}
                name="category_name"
                defaultValue={name}
            />
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <label htmlFor="color">{translation('category_form.color_label')}:</label>
                <input type="color" id="color" name="color" list="colorList" defaultValue={color || categoryColors[0]}></input>
            </Stack>
            <datalist id="colorList">
                {
                    categoryColors.map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                    ))
                }
            </datalist>
            <Button variant="contained" color="warning" type="submit">
                {translation('confirm')}
            </Button>
        </Stack>
    );
};