import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type TagItemType = {
    colorPrimary: string,
    colorSecondary: string,
    name: string,
    tag: string
};

export const TagItem: React.FC<TagItemType> = ({ colorSecondary, colorPrimary, name, tag }) => {

    return (
        <Box sx={{
            backgroundColor: colorSecondary,
            borderRadius: 4,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <Typography variant="subtitle1" sx={{ color: colorPrimary }}>#{tag}</Typography>
            {/* <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'} flex={1}> */}
                {/* <Typography variant="subtitle1">{name}</Typography> */}
                {/* <Stack alignItems={"center"} justifyContent={'center'} height={'100%'}> */}
                {/* <ArrowForwardIosIcon /> */}
                {/* </Stack> */}
            {/* </Stack> */}
        </Box>
    );
};