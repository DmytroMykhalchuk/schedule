import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { categoryColors } from '@/server/constants';
import { UIInputField } from '../UI/UIInputField';

type CategoryFormType = {
    color?: string,
    name?: string,
};

export const CategoryForm: React.FC<CategoryFormType> = ({ color, name }) => {
    return (
        <Stack spacing={2}>
            <UIInputField
                label="Category name"
                name="category_name"
                defaultValue={name}
            />
            <Stack direction={'row'} spacing={1}>
                <label htmlFor="color">Оберіть колір:</label>
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
                Confirm
            </Button>
        </Stack>
    );
};