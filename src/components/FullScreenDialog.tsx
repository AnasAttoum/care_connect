import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, createTheme, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { patients, rooms } from '../constants/data';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
    palette: {
        primary: {
            main: '#353b55',
        },
    },
});

export default function FullScreenDialog({ open, setOpen, selectedRoomID }: {
    open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, selectedRoomID: number | undefined
}) {

    const [patientsInThisRoom, setPatientsInThisRoom] = React.useState<number[]>([])
    console.log("🚀 ~ patientsInThisRoom:", patientsInThisRoom)

    const handleClose = () => {
        setOpen(false);
    };
    const bedsNumber = (selectedRoomID && rooms.find((room) => { return room.id === selectedRoomID })) ? rooms.find((room) => { return room.id === selectedRoomID })?.beds_number || 0 : 0
    React.useEffect(()=>{
        setPatientsInThisRoom(
            Array.from({ length: bedsNumber }).map(() => {
                return 0
            })
        )
    },[bedsNumber])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Patients in this room
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>

                        {Array.from({ length: bedsNumber }).map((_el, index) => {
                            return <div key={index}>
                                <ListItemButton>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}>
                                        <FormControl style={{ width: '95vw', marginBlock: '20px', color: 'var(--primary)' }}>
                                            <InputLabel id="demo-simple-select-label"
                                                sx={{
                                                    color: 'var(--primary)',
                                                    '&.Mui-focused': {
                                                        color: 'var(--primary)',
                                                    }
                                                }}
                                            >Bed number {index + 1}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={patientsInThisRoom[index]}
                                                label={`Bed number ${index + 1}`}
                                                onChange={(e) => { setPatientsInThisRoom(
                                                    prev=> (prev.map((el,i)=>{
                                                        if(i===index)
                                                            return parseInt(e.target.value.toString())
                                                        else
                                                        return el
                                                    }))
                                                ) }}
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
                                            >
                                                <MenuItem value={0}>Empty</MenuItem>
                                                {patients.map(({ id, name }, index) => {
                                                    return <MenuItem value={id} key={index}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </ListItemButton>
                                <Divider />
                            </div>
                        })
                        }

                    </List>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
    );
}
