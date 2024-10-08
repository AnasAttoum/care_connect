import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { department } from "../constants/types";
import { Link } from 'react-router-dom';


export default function DepartmentCard({ department: { id, name, phone_number, total_rooms, available_rooms, total_doctors, description } }: { department: department }) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        console.log(id)
        handleClose()
    }

    return (
        <div className="flex flex-col gap-5 p-5 rounded-2xl cursor-pointer opacity-0 bg-white transition-all hover:bg-slate-50 hover:!scale-105 trans" style={{ width: '350px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

            <div className="text-[--primary]">
                <div className="flex justify-between">
                    <div className="text-lg font-bold">{name}</div>
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
                            <MenuItem onClick={handleClose}><Link to={`/departments/${id}`}>Edit</Link></MenuItem>
                            <MenuItem onClick={handleDelete}><span className='text-red-500'>Delete</span></MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="text-gray-400">( {phone_number} )</div>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="text-gray-400">Rooms</div>
                    <div className="text-[--primary]">{total_rooms}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-400">available Rooms</div>
                    <div className="text-[--primary]">{available_rooms}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-400">Doctors</div>
                    <div className="text-[--primary]">{total_doctors}</div>
                </div>
            </div>

            <div className="flex flex-col">
                <div style={{ color: 'var(--primary)', fontWeight: '600' }}>About:</div>
                <div className="text-[--primary]">{description}</div>
            </div>

        </div >
    )
}
