import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

type FromHourType = {
    allowedHours: number[]
    onChange: (hour: number) => void
    value: number
    name: string
};

export const HourSelect: React.FC<FromHourType> = ({ allowedHours, onChange, value, name }) => {
    return (
        <Select
            size='small'
            color='warning'
            sx={{
                textAlign: 'center',
                '& svg.MuiSelect-icon': {
                    display: 'none',
                },
                '& .MuiSelect-select': {
                    pr: '0 !important',
                    p: 0,
                },
                // '& fieldset': {
                //     border: 'none',
                // }
            }}
            renderValue={(value) => (
                <Typography variant="body1" p={1}>{value ? value + ':00' : 'none'}</Typography>
            )}
            defaultValue={allowedHours[0]}
            value={value}
            required
            name={name}
            onChange={(event) => {
                const selectedValue = +event.target.value;
                !isNaN(selectedValue) && onChange(selectedValue);
            }}
        >
            {
                allowedHours.map((hour, index) => (
                    <MenuItem value={hour} key={index} sx={{ textAlign: 'center' }}>
                        {hour}:00
                    </MenuItem>
                ))
            }
        </Select>
    );
}