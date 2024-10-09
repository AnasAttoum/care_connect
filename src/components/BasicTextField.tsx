import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function BasicTextField({ val, handleChange, error, name, label }: { val: string | number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: string, name: string, label: string }) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#353b55',
            },
        },
    });

    return (
        <Box
            component="form"
            sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <ThemeProvider theme={theme}>
                <TextField style={{ width: '80%', marginBlock: '20px', color: 'var(--primary)' }} id="outlined-basic" name={name} label={label} variant="outlined" value={val}
                    onChange={handleChange}
                    error={error !== ''}
                    helperText={error}
                />
            </ThemeProvider>

        </Box>
    );
}
