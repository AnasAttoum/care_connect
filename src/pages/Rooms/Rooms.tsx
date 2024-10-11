import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import Title from "../../components/Title";
import { rooms } from '../../constants/data';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function Rooms() {

    const { ref, inView, entry } = useInView()

    useEffect(() => {
        if (entry)
            (entry.target as HTMLElement).style.animation = `animationBasic .7s .3s forwards`
    }, [inView, entry])

    return (
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
    )
}