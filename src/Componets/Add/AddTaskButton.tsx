import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { useTranslations } from 'next-intl';

type AddTaskButtonType = {
};

export const AddTaskButton: React.FC<AddTaskButtonType> = ({ }) => {
    const translation = useTranslations('MyTasks');
    
    return (
        <MiddlePaperWrapper>
            <Stack>
                <Button variant="outlined" color='inherit' sx={{ p: 1, textTransform: 'none', fontSize: '1.25em' }}>
                    + {translation('add_task')}
                </Button>
            </Stack>
        </MiddlePaperWrapper>
    );
};