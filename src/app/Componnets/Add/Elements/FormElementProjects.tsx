import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ShareIcon from '@mui/icons-material/Share';
import { getProjectDirectories } from "../actions";

type FormElementProjectsType = {
    defaultDirectory?: string
};

export const FormElementProjects: React.FC<FormElementProjectsType> = async ({ defaultDirectory }) => {
    const directories = await getProjectDirectories() || [];

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>Project</Typography>
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
                    defaultValue={defaultDirectory || directories[0]._id.toString()}
                    required
                    name="directory"
                >
                    {
                        directories.map((directory, index) => (
                            <MenuItem value={directory._id.toString()} key={index}>
                                <Stack direction={'row'} spacing={1}>
                                    <Typography variant="body1" component={'span'}>{directory.name}</Typography>
                                    {index === 0 && <ShareIcon />}
                                </Stack>
                            </MenuItem>
                        ))
                    }
                </Select>

            </Grid>
        </Grid>
    );
};