'use client';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { categoryColors } from '@/server/constants';
import { UIInputField } from '@/Componets/UI/UIInputField';
import { useEffect, useState } from 'react';

type ControlCategoryFormType = {
    name?: string;
    color?: string;
    dictionary: {
        categoryName: string;
        colorLabel: string;
        confirm: string;
    };
    categoriesCount: number;
};

export const ControlCategoryForm: React.FC<ControlCategoryFormType> = ({ color, name, dictionary, categoriesCount }) => {
    const [fromData, setFromData] = useState({
        color: color || categoryColors[0],
        categoryName: name || '',
    });

    useEffect(() => {
        setFromData({
            color: color || categoryColors[0],
            categoryName: name || '',
        });
    }, [categoriesCount]);

    const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.currentTarget.value;
        setFromData((fata: { color: string, categoryName: string }) => ({ ...fata, color }))
    };

    const onChangeCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const categoryName = event.currentTarget.value;
        setFromData((fata: { color: string, categoryName: string }) => ({ ...fata, categoryName }))
    };

    return (
        <>
            <UIInputField
                label={dictionary.categoryName}
                name="category_name"
                value={fromData.categoryName}
                onChange={onChangeCategoryName}
            />
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <label htmlFor="color">{dictionary.colorLabel}:</label>
                <input type="color" id="color" name="color" list="colorList"
                    value={fromData.color}
                    onChange={onChangeColor}
                />
            </Stack>
            <datalist id="colorList">
                {
                    categoryColors.map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                    ))
                }
            </datalist>
            <Button variant="contained" color="warning" type="submit">
                {dictionary.confirm}
            </Button>
        </>
    );
};