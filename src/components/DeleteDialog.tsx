import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog({ open, handleClose, handleDelete, loading }: { open: boolean, handleClose: () => void, handleDelete: () => void, loading: string }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure that you want to delete this?"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'gray' }}>Disagree</Button>
                    <Button onClick={handleDelete} sx={{ color: 'var(--primary)' }}>Agree</Button>
                    {loading === 'pending' &&
                        <div className='flex justify-center'>
                            <div className='miniLoader'></div>
                        </div>
                        }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default React.memo(DeleteDialog)