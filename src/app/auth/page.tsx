import { Button, Stack } from "@mui/material";
import { AuthButton } from "../Componnets/Auth/AuthButton";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <AuthButton />
        </Stack>
    );
};

export default Page;