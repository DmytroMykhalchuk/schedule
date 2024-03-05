import Stack from '@mui/material/Stack';
import { DirectoryCreateForm } from '@/Componets/Add/DirectoryCreateForm';
import { getDirectory, updateDirectory } from './actions';

type PageType = {
    params: {
        locale: string;
        id: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale, id } = params;
    const directory = await getDirectory(id);

    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <DirectoryCreateForm
                formAction={updateDirectory}
                locale={locale}
                title='directory.update_title'
                type="update"
                defaultValues={{
                    id: directory._id,
                    name: directory.name,
                }}
            />
        </Stack>
    );
};

export default Page;