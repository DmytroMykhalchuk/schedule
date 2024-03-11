import Stack from '@mui/material/Stack';
import { ControlCategoryForm } from './Elements/ControlCategoryForm';
import { useTranslations } from 'next-intl';

type CategoryFormType = {
    color?: string;
    name?: string;
    categoriesCount?: number;
};

export const CategoryForm: React.FC<CategoryFormType> = ({ color, name, categoriesCount=0 }) => {
    const translation = useTranslations('Form');
    return (
        <Stack spacing={2}>
            <ControlCategoryForm
                name={name}
                color={color}
                dictionary={{
                    categoryName: translation('category_form.category_placeholder'),
                    colorLabel: translation('category_form.color_label'),
                    confirm: translation('confirm'),
                }}
                categoriesCount={categoriesCount}
            />
        </Stack>
    );
};