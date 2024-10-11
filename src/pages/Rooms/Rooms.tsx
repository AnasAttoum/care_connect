import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import Title from "../../components/Title";
import { rooms } from '../../constants/data';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import FloatingButton from '../../components/FloatingButton';
import DeleteDialog from '../../components/DeleteDialog';



const paginationModel = { page: 0, pageSize: 5 };

export default function Rooms() {

    const { ref, inView, entry } = useInView()
    const id = useRef<number>(0)

    useEffect(() => {
        if (entry)
            (entry.target as HTMLElement).style.animation = `animationBasic .7s .3s forwards`
    }, [inView, entry])



    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenDeleteModal = (params:any) => {setOpenDeleteModal(true);id.current = params.id}
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleDelete = () => {
        console.log(id.current)
        handleCloseDeleteModal()
    }
    const columns: GridColDef[] = [
        { field: 'room_number', headerName: 'Room Number', width: 180 },
        {
            field: 'status', headerName: 'Status', width: 180,
            renderCell: (params) => {
                return (
                    <span
                        style={params.value === 'occupied' ?
                            { color: 'gray', border: '1px solid gray', backgroundColor: '#80808050', paddingInline: '3px', borderRadius: '3px' }
                            : params.value === 'vacant' ?
                                { color: 'green', border: '1px solid green', backgroundColor: '#00ff0050', paddingInline: '3px', borderRadius: '3px' }
                                :
                                { color: 'red', border: '1px solid red', backgroundColor: '#ff000050', paddingInline: '3px', borderRadius: '3px' }
                        }>{params.value}</span>
                );
            }
        },
        { field: 'department_name', headerName: 'Department', width: 180 },
        { field: 'type', headerName: 'Type', width: 180, },
        { field: 'beds_number', headerName: 'Beds Number', width: 180, },
        {
            field: '', headerName: 'Actions', width: 180,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center mt-4'>
                        <span className='cursor-pointer' onClick={(e) => { handleOpenDeleteModal(params);e.stopPropagation(); }}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#d32f2f" d="M11 3h5v1H0V3h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632zM6 3h4V1H6z"></path></svg></span>
                    </div>
                );
            }
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        // },
    ];

    return (
        <>
            <div className="px-5">
                <Title title="Our Rooms" />

                <div className='flex justify-center'>

                    <Paper sx={{ width: 'fit-content', overflowX: 'scroll', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', opacity: '0' }} ref={ref}>
                            <DataGrid
                                rows={rooms}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[5, 10]}
                                // checkboxSelection
                                sx={{ border: 0 }}
                            />
                        </div>

                    </Paper>

                </div>

            </div>


            <DeleteDialog open={openDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} />

            <FloatingButton url='/rooms/add' tooltip='Add Room' />
        </>
    )
}