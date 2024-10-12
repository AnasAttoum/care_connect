import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BasicSelectDate({ label, val, name, setVal,error }: { label: string, val: string, setVal: any, name: string,error:string }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#353b55',
            },
        },
    });
console.log(val)
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0 },marginBlock: '20px' }}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField', 'DatePicker']} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <DatePicker
                            sx={{ width: '80%', color: 'var(--primary)' }}
                            label={label}
                            format="YYYY/MM/DD"
                            defaultValue={dayjs(val)}
                            value={dayjs(val)}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={(e) => { if (e) setVal((prev:any) => ({ ...prev, [name]: e.format("YYYY/MM/DD") })) }}
                            slotProps={{
                                textField: {
                                  error: !!error,
                                  helperText: error,
                                },
                              }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </ThemeProvider>
        </Box>
    );
}
