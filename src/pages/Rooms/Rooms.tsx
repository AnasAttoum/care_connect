import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import Title from "../../components/Title";
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import FloatingButton from '../../components/FloatingButton';
import DeleteDialog from '../../components/DeleteDialog';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { room } from '../../constants/types';
import { deleteRoom, getRooms } from '../../lib/slices/roomSlice';
import Loading from '../Loading';



export default function Rooms() {

    const { ref, inView, entry } = useInView()
    const id = useRef<number>(0)

    const dispatch = useDispatch<AppDispatch>()
    const { loading, loadingDelete } = useSelector((state: RootState) => state.room)
    const [totalRooms, setTotalRooms] = useState<room[]>([])
    const [totalRows, setTotalRows] = useState<number>(10)
    const [paginationModel, setPaginationModel] = useState<{ page: number, pageSize: number }>({ page: 0, pageSize: 10 })

    useEffect(() => {
        if (entry)
            (entry.target as HTMLElement).style.animation = `animationBasic .7s .3s forwards`
    }, [inView, entry])

    useEffect(() => {
        dispatch(getRooms(1)).unwrap().then(result => {
            setTotalRows(result.pagination.total)
            setTotalRooms(result.data)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
    }, [dispatch])



    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = (params: any) => { setOpenDeleteModal(true); id.current = params.id }
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleDelete = () => {
        dispatch(deleteRoom(id.current.toString())).unwrap().then(() => {
            setTotalRooms(prev => prev.filter((el) => {
                return el.id !== id.current
            }))
            handleCloseDeleteModal()
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
            handleCloseDeleteModal()
        })
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
        {
            field: 'department_name', headerName: 'Department', width: 180,
            renderCell: (params) => {
                return (
                    <div>{params.row.department.name}</div>
                );
            }
        },
        { field: 'type', headerName: 'Type', width: 180, },
        { field: 'beds_number', headerName: 'Beds Number', width: 180, },
        // {
        //     field: 'patiens', headerName: 'Patients', width: 180,
        //     renderCell: () => {
        //         return (
        //             <div className='flex items-center gap-5 mt-3 w-full' style={{ height: '30px' }}>
        //                 <Btn click={() => {  setSelectedRoomID(params.id as number); handleClickOpen() }} title='Show Patients' />
        //             </div>
        //         );
        //     }
        // },
        {
            field: 'actions', headerName: 'Actions', width: 180,
            renderCell: (params) => {
                return (
                    <div className='flex items-center gap-5 mt-3'>
                        <Link to={`/rooms/edit/${params.id}`}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="var(--primary)" fillRule="evenodd" d="M14 4.182A4.14 4.14 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4 4 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71l1.287-1.31l.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141l5.063-5.218zm-6.25 6.886l-1.98 5.849a.99.99 0 0 0 .245 1.026a1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01l5.096-5.186l-2.218-2.183l-5.063 5.218l2.185 2.15Z" clipRule="evenodd"></path></svg></Link>
                        <span className='cursor-pointer' onClick={(e) => { handleOpenDeleteModal(params); e.stopPropagation(); }}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#d32f2f" d="M11 3h5v1H0V3h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632zM6 3h4V1H6z"></path></svg></span>
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

    // const [open, setOpen] = useState(false);
    // const [selectedRoomID, setSelectedRoomID] = useState<number>();

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleChangePage = (e: { page: number }) => {
        setPaginationModel(prev => ({ ...prev, page: e.page }))
        dispatch(getRooms(e.page + 1)).unwrap().then(result => {
            setTotalRows(result.pagination.total)
            setTotalRooms(result.data)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
    }

    return (
        <>
            {
                loading === 'pending' ?
                    <Loading />
                    :
                    <>
                        <div className="px-5">
                            <Title title="Our Rooms" />

                            <div className='flex justify-center'>

                                <Paper sx={{ width: 'fit-content', overflowX: 'scroll', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                                    <div className='px-5 py-2' style={{ display: 'flex', flexDirection: 'column', opacity: '0' }} ref={ref}>
                                        <DataGrid
                                            rows={totalRooms}
                                            columns={columns}
                                            initialState={{ pagination: { paginationModel } }}
                                            pageSizeOptions={[10]}
                                            rowCount={totalRows}
                                            paginationMode="server"
                                            paginationModel={paginationModel}
                                            onPaginationModelChange={handleChangePage}
                                            // checkboxSelection
                                            sx={{ border: 0 }}
                                        />
                                    </div>

                                </Paper>

                            </div>

                        </div>

                        {/* <FullScreenDialog open={open} setOpen={setOpen} selectedRoomID={selectedRoomID} /> */}

                        <DeleteDialog open={openDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} loading={loadingDelete} />

                        <FloatingButton url='/rooms/add' tooltip='Add Room' />
                    </>
            }
        </>
    )
}