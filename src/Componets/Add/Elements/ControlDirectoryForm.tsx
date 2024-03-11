'use client';
import { UIInputField } from "@/Componets/UI/UIInputField";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";

type ControlDirectoryFormType = {
    directoryName?: string;
    dictionary: {
        confirm: string;
        directoryPlaceholder: string;
    };
    directoriesCount: number;
};

export const ControlDirectoryForm: React.FC<ControlDirectoryFormType> = ({ directoryName, dictionary, directoriesCount }) => {
    const [formData, setFormData] = useState({
        directoryName: directoryName || ''
    });

    useEffect(() => {
        setFormData({
            directoryName: directoryName || '',
        });
    }, [directoriesCount]);

    const onChangeDirectoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const directoryName = event.currentTarget.value;
        setFormData((formData: { directoryName: string }) => ({ ...formData, directoryName }));
    };

    return (
        <>
            <UIInputField
                label={dictionary.directoryPlaceholder}
                name="new_directory"
                value={formData.directoryName}
                onChange={onChangeDirectoryName}
            />
            <Button variant="contained"
                color="warning"
                sx={{ textTransform: 'none' }}
                type='submit'
            >
                {dictionary.confirm}
            </Button>
        </>
    );
};