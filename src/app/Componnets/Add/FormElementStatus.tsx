import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { statuses } from "@/server/constants";

type FormElementStatusType = {
    defaultStatus?: string
};

export const FormElementStatus: React.FC<FormElementStatusType> = ({ defaultStatus = statuses[0].statusName }) => {

    return (
        <>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={3} justifyContent={'center'}>
                    <Stack justifyContent={'center'} height={'100%'}>
                        <Typography variant="body1" color={'gray'}>Status</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <Select
                        size='small'
                        color='warning'
                        sx={{
                            '& svg.MuiSelect-icon': {
                                display: 'none',
                            },
                            '& .MuiSelect-select': {
                                p: 0,
                            },
                            '& fieldset': {
                                border: 'none',
                            }
                        }}
                        defaultValue={defaultStatus}
                        required
                        name="status"
                    >
                        {
                            statuses.map((status, index) => (
                                <MenuItem value={status.statusName} key={index}>
                                    <Chip
                                        label={status.statusName}
                                        sx={{ backgroundColor: status.secondaryColor, color: status.primaryColor }}
                                    />
                                </MenuItem>
                            ))
                        }
                    </Select>

                </Grid>
            </Grid>
        </>
    );
};