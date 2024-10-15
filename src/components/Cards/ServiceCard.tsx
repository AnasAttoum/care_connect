import { Button, Menu, MenuItem } from "@mui/material";
import { service } from "../../constants/types";
import { MouseEvent, useState } from "react";
import DeleteDialog from "../DeleteDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { deleteService } from "../../lib/slices/serviceSlice";

export default function ServiceCard({ service: { id, name, description, department } }: { service: service }) {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { loadingDelete } = useSelector((state: RootState) => state.service)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => { setOpenDeleteModal(true); handleClose() }
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleDelete = () => {
        dispatch(deleteService(id.toString())).unwrap().then(() => {
            handleCloseDeleteModal()
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
            handleCloseDeleteModal()
        })
    }

    return (
        <>
            <div className="flex flex-col justify-around gap-5 p-5 rounded-lg opacity-0 bg-white transition-all hover:bg-slate-50 hover:!scale-105 relative trans" style={{ width: '400px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <div className="flex justify-between">
                    <div className="text-[--primary] font-bold">{name}</div>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{ padding: '0', transform: 'translateX(15px)' }}
                            onClick={handleClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="#353b55" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5.92A.96.96 0 1 0 12 4a.96.96 0 0 0 0 1.92m0 7.04a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92M12 20a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92"></path></svg>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { handleClose(); setTimeout(() => { navigate(`/services/edit/${id}`) }, 1) }}>Edit</MenuItem>
                            <MenuItem onClick={handleOpenDeleteModal}><span className='text-red-500'>Delete</span></MenuItem>
                        </Menu>
                    </div>

                </div>

                <div className="text-[--primary]">{description}</div>


                <div className="flex">
                    <div className="flex flex-col gap-5 w-1/2">
                        <div className="text-gray-400">Department: <span className="text-[--primary] font-bold">{department.name}</span></div>
                    </div>

                </div>


            </div>

            <DeleteDialog open={openDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} loading={loadingDelete} />
        </>
    )
}
