import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function BasicSelect({ val, setVal, error, name, label, data }: {
    val: string | number, setVal: any, error: string, name: string, label: string, data: { id: number | string; name: string; }[]
}) {

    const handleChange = (event: SelectChangeEvent) => {
        setVal((prev:any) => ({ ...prev, [name]: event.target.value as string }));
    };



    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}>
            <FormControl style={{ width: '80%', marginBlock: '20px', color: 'var(--primary)' }}>
                <InputLabel id="demo-simple-select-label"
                    error={error !== ''}
                    sx={{
                        color: 'var(--primary)',
                        '&.Mui-focused': {
                            color: 'var(--primary)',
                        }
                    }}
                >{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={val.toString()}
                    label={label}
                    onChange={handleChange}
                    sx={{
                        '& .MuiSelect-select': {
                            color: 'black',
                        },
                        "& .MuiSvgIcon-root": {
                            color: "var(--primary)",
                        },
                        color: "white",
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bbb',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            color: 'var(--primary)',
                            borderColor: 'var(--primary)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#999',
                        },
                    }}

                    error={error !== ''}
                >
                    {data.map(({ id, name }, index) => {
                        return <MenuItem value={id} key={index}>{name}</MenuItem>
                    })}
                </Select>
                <FormHelperText sx={{ color: '#d32f2f' }}>{error}</FormHelperText>
            </FormControl>
        </Box>
    );
}
