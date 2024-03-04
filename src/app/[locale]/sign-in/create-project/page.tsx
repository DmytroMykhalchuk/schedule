import Stack from '@mui/material/Stack';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { ProjectForm } from '@/Componets/SignIn/ProjectForm';

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack
            pt={2}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <ProjectForm locale={locale} authEmail={authEmail} />
        </Stack>
    );
};

export default Page;