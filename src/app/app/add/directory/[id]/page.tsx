import { MiddlePaperWrapper } from "@/ui/MiddlePaperWrapper";
import Stack from "@mui/material/Stack";
import { getDirectory, updateDirectory } from "./actions";
import { UIInputField } from "@/app/Componnets/UI/UIInputField";
import Button from '@mui/material/Button'

type PageType = {
    params: { id: string }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id } = params;
    const directory = await getDirectory(id);

    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <MiddlePaperWrapper pathBack="/app/add/directory" title='Update directory'>
                <form action={updateDirectory}>
                    <input type="hidden" name="directory_id" value={id} />
                    <UIInputField
                        label="Project directory"
                        name="directory_name"
                        defaultValue={directory.name}
                    />
                    <Stack justifyItems={'center'} alignItems={'center'} pt={2}>
                        <Button variant="contained" color="warning" type="submit">
                            Confirm
                        </Button>
                    </Stack>
                </form>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;