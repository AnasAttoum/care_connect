import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../lib/store";
import { doctors, medicalRecords, rooms } from "../../../constants/data";
import { doctor, room } from "../../../constants/types";
import { validateMedicalRecord } from "../../../validations/validation";
import { getMedicalRecord, putMedicalRecord } from "../../../lib/slices/medicalRecords";
import Title from "../../../components/Title";
import Btn from "../../../components/Btn";
import BasicSelect from "../../../components/BasicSelect";
import BasicSelectDate from "../../../components/BasicSelectDate";
import BasicTextField from "../../../components/BasicTextField";
import Loading from "../../Loading";
import { Box, createTheme, TextField, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#353b55',
        },
    },
});

export default function EditMedicalRecord() {

    const { patientId, id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { loadingMedicalRecord, loadingPut } = useSelector((state: RootState) => state.medicalRecord)
    const navigate = useNavigate()

    const [data, setData] = useState({
        doctor_id: 0,
        room_id: 0,
        blood_type: '',
        admission_date: '',
        discharge_date: '',
        medicines: [''],
        details: '',
    })
    const [error, setError] = useState({
        doctor_id: '',
        room_id: '',
        blood_type: '',
        admission_date: '',
        discharge_date: '',
        medicines: '',
        details: '',
    })

    const [allDoctors, setAllDoctors] = useState<{ id: number; name: string; }[]>([])
    const [allRooms, setAllRooms] = useState<{ id: number; name: string; }[]>([])
    useEffect(() => {
        setAllDoctors(doctors.map((doctor: doctor) => { return { id: doctor.id || 0, name: doctor.name } }))
        setAllRooms(rooms.map((room: room) => { return { id: room.id || 0, name: room.room_number.toString() } }))
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getMedicalRecord(id)).unwrap().then(result => {
                console.log(result)
            }).catch((error) => {
                console.log("🚀 ~ dispatch ~ error:", error.message)
                const found = medicalRecords.find((record) => {
                    return record.id === parseInt(id)
                })

                if (found)
                    setData({
                        doctor_id: found.doctor_id.id,
                        room_id: found.room_id.id,
                        blood_type: found.blood_type.toUpperCase(),
                        admission_date: found.admission_date,
                        discharge_date: found.discharge_date,
                        medicines: found.medicines[0].split(','),
                        details: found.details,
                    })
            })
        }
    }, [id, dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleEdit = async () => {
        setError({
            doctor_id: '',
            room_id: '',
            blood_type: '',
            admission_date: '',
            discharge_date: '',
            medicines: '',
            details: '',
        })
        try {
            await validateMedicalRecord.validate(data, { abortEarly: false })
            if (patientId && id) {
                const formData = new FormData()
                formData.append('patient_id', patientId)
                formData.append('doctor_id', data.doctor_id.toString())
                formData.append('room_id', data.room_id.toString())
                formData.append('blood_type', data.blood_type)
                formData.append('admission_date', data.admission_date)
                formData.append('discharge_date', data.discharge_date)
                formData.append('medicines', data.medicines.join())
                formData.append('details', data.details)

                dispatch(putMedicalRecord({ data: formData, id: id })).unwrap().then(() => {
                    navigate('/')
                }).catch((error) => {
                    console.log("🚀 ~ dispatch ~ error:", error.message)
                })
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            error.inner.forEach(({ path, message }: { path: string, message: string }) => {
                setError(prev => ({ ...prev, [path]: message }))
            });
        }
    }

    return (
        <>
            {loadingMedicalRecord === 'pending' ?
                <Loading />
                :
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

                    <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                        <Title title="Edit Medical Record" />

                        <BasicSelect val={data.doctor_id} setVal={setData} error={error.doctor_id} name="doctor_id" label="Doctor" data={allDoctors} />
                        <BasicSelect val={data.room_id} setVal={setData} error={error.room_id} name="room_id" label="Room" data={allRooms} />
                        <BasicSelect val={data.blood_type} setVal={setData} error={error.blood_type} name="blood_type" label="Blood Type" data={[{ id: 'A+', name: 'A+' }, { id: 'A-', name: 'A-' }, { id: 'B+', name: 'B+' }, { id: 'B-', name: 'B-' }, { id: 'O+', name: 'O+' }, { id: 'O-', name: 'O-' }, { id: 'AB+', name: 'AB+' }, { id: 'AB-', name: 'AB-' }]} />
                        <BasicSelectDate val={data.admission_date} setVal={setData} error={error.admission_date} name='admission_date' label='Admission Date' />
                        <BasicSelectDate val={data.discharge_date} setVal={setData} error={error.discharge_date} name='discharge_date' label='Discharge Date' />
                        <BasicTextField val={data.details} handleChange={handleChange} error={error.details} name="details" label="Details" />
                        <Box
                            component="form"
                            sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <ThemeProvider theme={theme}>
                                <div className="flex flex-col items-center !w-full" >
                                    {data.medicines.map((_medicin, index) => {
                                        return <div key={index} className="flex items-center justify-center gap-5" style={{ width: '80%' }}>
                                            <TextField style={{ width: '100%', marginBlock: '20px', color: 'var(--primary)' }} id="outlined-basic" label={`Medicine Number ${index+1}`} variant="outlined" value={data.medicines[index]}
                                                onChange={(e) => setData(prev => ({
                                                    ...prev,
                                                    medicines: prev.medicines.map((el, i) => {
                                                        if (i === index)
                                                            return e.target.value
                                                        return el
                                                    })
                                                }))}
                                                error={error.medicines !== ''}
                                                helperText={error.medicines}
                                            />

                                            {data.medicines.length > 1 &&
                                                <span className='cursor-pointer' onClick={() => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        medicines: prev.medicines.filter((_el, i) => { return i !== index })
                                                    }))
                                                }}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#d32f2f" d="M11 3h5v1H0V3h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632zM6 3h4V1H6z"></path></svg></span>
                                            }

                                        </div>
                                    })}

                                    <svg className="cursor-pointer" onClick={() => setData(prev => ({ ...prev, medicines: [...prev.medicines, ''] }))} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32"><g fill="none"><path fill="url(#f2072id4)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><path fill="url(#f2072id5)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><path fill="url(#f2072id6)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><path fill="url(#f2072id0)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><path fill="url(#f2072id1)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><path fill="url(#f2072id2)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><path fill="url(#f2072id3)" d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"></path><defs><radialGradient id="f2072id0" cx={0} cy={0} r={1} gradientTransform="matrix(0 2.85096 -5.34217 0 16.31 28.79)" gradientUnits="userSpaceOnUse"><stop offset={0.096} stopColor="#9447fe"></stop><stop offset={0.846} stopColor="#7d6cbb" stopOpacity={0}></stop></radialGradient><radialGradient id="f2072id1" cx={0} cy={0} r={1} gradientTransform="matrix(-3.26241 0 0 -4.60993 2.26 15.156)" gradientUnits="userSpaceOnUse"><stop offset={0.11} stopColor="#41366a"></stop><stop offset={1} stopColor="#7e5fcd" stopOpacity={0}></stop></radialGradient><radialGradient id="f2072id2" cx={0} cy={0} r={1} gradientTransform="matrix(1.0537 -1.67517 2.25759 1.42004 17.194 3.818)" gradientUnits="userSpaceOnUse"><stop offset={0.177} stopColor="#a398d8"></stop><stop offset={1} stopColor="#8a7acc" stopOpacity={0}></stop></radialGradient><radialGradient id="f2072id3" cx={0} cy={0} r={1} gradientTransform="matrix(1.46526 -1.95368 1.4073 1.05548 18.874 13.64)" gradientUnits="userSpaceOnUse"><stop offset={0.177} stopColor="#a398d8"></stop><stop offset={1} stopColor="#8a7acc" stopOpacity={0}></stop></radialGradient><linearGradient id="f2072id4" x1={15.985} x2={15.985} y1={2} y2={27.773} gradientUnits="userSpaceOnUse"><stop stopColor="#7366ad"></stop><stop offset={1} stopColor="#7d5dd4"></stop></linearGradient><linearGradient id="f2072id5" x1={15.985} x2={15.985} y1={12.732} y2={19.5} gradientUnits="userSpaceOnUse"><stop stopColor="#655898"></stop><stop offset={0.214} stopColor="#8276bd"></stop><stop offset={0.335} stopColor="#897ec1"></stop><stop offset={0.523} stopColor="#7966c1"></stop><stop offset={0.863} stopColor="#8842ec"></stop><stop offset={1} stopColor="#6035be"></stop></linearGradient><linearGradient id="f2072id6" x1={13} x2={20.766} y1={9} y2={9} gradientUnits="userSpaceOnUse"><stop stopColor="#564199" stopOpacity={0}></stop><stop offset={0.352} stopColor="#7362af"></stop><stop offset={0.563} stopColor="#8878ca"></stop><stop offset={0.643} stopColor="#8878ca"></stop><stop offset={0.849} stopColor="#9489cb" stopOpacity={0}></stop></linearGradient></defs></g></svg>

                                </div>
                            </ThemeProvider>

                        </Box>

                        <Btn click={handleEdit} title="Edit" />
                        {loadingPut === 'pending' &&
                            <div className="flex justify-center my-5">
                                <div className="loader"></div>
                            </div>
                        }

                    </div>

                </div>
            }
        </>
    )
}