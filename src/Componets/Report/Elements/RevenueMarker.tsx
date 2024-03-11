import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'

type RevenueMarkerType = {
    color: string;
    label: string;
};

export const RevenueMarker: React.FC<RevenueMarkerType> = ({ color, label }) => {

    return (
        <Stack alignItems={'center'} direction={'row'} spacing={1}>
            <Box width={'0.5em'} height={'0.5em'} bgcolor={color} />
            <Typography variant="caption">{label}</Typography>
        </Stack>
    );
};