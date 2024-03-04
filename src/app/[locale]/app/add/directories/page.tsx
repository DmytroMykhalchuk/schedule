import Stack from '@mui/material/Stack';
import { createDirectory, getDirectories } from './actions';
import { DirectoriesList } from '@/Componets/Add/DirectoriesList';
import { DirectoryCreateForm } from '@/Componets/Add/DirectoryCreateForm';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail } = await getUserSessionAndEmail();
    const directories = await getDirectories(authEmail);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <DirectoryCreateForm locale={locale} formAction={createDirectory} title='directory.add_title' type='create'/>
            <MiddlePaperWrapper>
                <div>
                    <DirectoriesList directories={directories} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;