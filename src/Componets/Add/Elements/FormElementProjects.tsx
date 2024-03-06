import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ShareIcon from '@mui/icons-material/Share';
import { getProjectDirectories } from "../actions";
import { defaultDirectory } from "@/server/constants";
import { useTranslations } from "next-intl";


type FormElementProjectsType = {
    defaultValue?: string;
    authEmail: string;
    translatedName: string;
    translatedDefaultCategory: string;
    isDirectoryRequired: boolean;
};

export const FormElementProjects: React.FC<FormElementProjectsType> = async ({ defaultValue, authEmail, translatedName, isDirectoryRequired, translatedDefaultCategory }) => {
    const directories = await getProjectDirectories(authEmail) || [];

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>{translatedName}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={9} display={'flex'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                        placeholder="Directory"
                        defaultValue={defaultValue || defaultDirectory.value}
                        required
                        name="directory"
                    >
                        <MenuItem value={defaultDirectory.value}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant="body1" component={'span'}>{translatedDefaultCategory}</Typography>
                                {<ShareIcon />}
                            </Stack>
                        </MenuItem>
                        {
                            directories.map((directory, index) => (
                                <MenuItem value={directory._id.toString()} key={index}>
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography variant="body1" component={'span'}>{directory.name}</Typography>
                                    </Stack>
                                </MenuItem>
                            ))
                        }
                    </Select>
                    {isDirectoryRequired && <ErrorMessage />}
                </div>
            </Grid>
        </Grid>
    );
};

type ErrorMessageType = {
};

export const ErrorMessage: React.FC<ErrorMessageType> = ({ }) => {
    const translation = useTranslations('Form');
    return (
        <Typography variant="caption" color="error">{translation('required')}</Typography>
    );
};