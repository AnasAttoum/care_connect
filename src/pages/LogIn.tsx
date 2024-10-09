import { useState } from "react";
import Title from "../components/Title";
import BasicTextField from "../components/BasicTextField";
import Btn from "../components/btn";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, TextField } from "@mui/material";
import { validateLogIn } from "../validations/validation";

export default function LogIn() {

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleLogIn = async () => {
        setError({
            email: '',
            password: ''
        })
        try {
            await validateLogIn.validate(data, { abortEarly: false })

            const formData = new FormData()
            formData.append('email',data.email)
            formData.append('password',data.password)

            console.log(formData)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            error.inner.forEach(({ path, message }: { path: string, message: string }) => {
                setError(prev => ({ ...prev, [path]: message }))
            });
        }
    }


    const theme = createTheme({
        palette: {
            primary: {
                main: '#353b55',
            },
        },
    });

    return (
        <div className="flex justify-center items-center" style={{ background: 'url(/images/background.jpg) no-repeat', backgroundSize: 'cover', minHeight: '100vh' }} >

            <div className="w-full lg:w-1/2 sm:w-4/5 rounded-none sm:rounded-2xl py-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.66)' }}>

                <Title title="Welcome To Care Connect" />

                <BasicTextField val={data.email} handleChange={handleChange} error={error.email} name="email" label="Email" />
                <Box
                    component="form"
                    sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <ThemeProvider theme={theme}>
                        <TextField id={'Password'} type='password' style={{ width: '80%', marginBlock: '20px', color: 'var(--primary)' }} value={data.password} label='Password' className='m-5' variant="outlined" color='primary'
                            onChange={(e) => { setData(prev => ({ ...prev, password: e.target.value })) }}
                            error={error.password !== ''}
                            helperText={error.password}
                        />
                    </ThemeProvider>
                </Box>

                <Btn click={handleLogIn} title="LogIn" />

            </div>

        </div >
    )
}