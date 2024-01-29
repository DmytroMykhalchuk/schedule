import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { priorities } from "@/server/constants";


type FormElementPriorityType = {
};

export const FormElementPriority: React.FC<FormElementPriorityType> = ({ }) => {

    return (
        <>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={3} justifyContent={'center'}>
                    <Stack justifyContent={'center'} height={'100%'}>
                        <Typography variant="body1" color={'gray'}>Priority</Typography>
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
                            '& .MuiSelect-select':{
                                p:0,
                            },
                            '& fieldset': {
                                border: 'none',
                            }
                        }}
                        defaultValue={priorities[0].statusName}
                        required
                        name="priority"
                    >
                        {
                            priorities.map((priority, index) => (
                                <MenuItem value={priority.statusName} key={index}>
                                    <Chip
                                        label={priority.statusName}
                                        sx={{ backgroundColor: priority.secondaryColor, color: priority.primaryColor }}
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