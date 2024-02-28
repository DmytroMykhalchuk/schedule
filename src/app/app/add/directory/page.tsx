import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '@/app/Componnets/Add/styles.module.scss';
import { createDirectory, getDirectories } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { DirectoriesList } from '@/app/Componnets/Add/DirectoriesList';
import { UIInputField } from '@/app/Componnets/UI/UIInputField';
import { getUserSessionAndEmail } from '@/app/Componnets/actions';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();
    const directories = await getDirectories(authEmail);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <MiddlePaperWrapper pathBack='/app/add' title='Add directory'>
                <form className={styles.formCreating} action={createDirectory}>
                    <UIInputField
                        label="Project directory"
                        name="new_directory"
                    />
                    <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                        Create
                    </Button>
                </form>
            </MiddlePaperWrapper>
            <MiddlePaperWrapper>
                <div>
                    <DirectoriesList directories={directories} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;