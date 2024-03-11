'use client';
import { Loader } from "@/Componets/Common/Loader";
import Stack from "@mui/material/Stack";


const Loading = () => {

    return (
        <Stack alignItems={'center'} justifyContent={'center'} height={'100%'} width={'100%'}>
            <Loader />
        </Stack>
    );
};

export default Loading;