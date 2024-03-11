import Stack from '@mui/material/Stack';
import { DirectoryCreateForm } from '@/Componets/Add/DirectoryCreateForm';
import { getDirectory, updateDirectory } from './actions';
import { notFound } from 'next/navigation';
import { getUserSessionAndEmail } from '@/Componets/actions';

type PageType = {
    params: {
        locale: string;
        id: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale, id } = params;
    const { authEmail } = await getUserSessionAndEmail();

    const directory = await getDirectory(id, authEmail);

    if (!directory) {
        return notFound();
    }

    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <div>
                <DirectoryCreateForm
                    formAction={updateDirectory}
                    locale={locale}
                    title='directory.update_title'
                    type="update"
                    defaultValues={{
                        id: directory._id,
                        name: directory.name,
                    }}
                    authEmail={authEmail}
                />
            </div>
        </Stack>
    );
};

export default Page;