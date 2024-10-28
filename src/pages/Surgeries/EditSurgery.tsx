import { useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateSurgery } from "../../validations/validation";
import Btn from "../../components/Btn";
import BasicSelect from "../../components/BasicSelect";
import BasicSelectDate from "../../components/BasicSelectDate";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { getSurgery, putSurgery } from "../../lib/slices/SurgeriesSlice";
import Loading from "../Loading";
import { getListOfRooms } from "../../lib/slices/roomSlice";
import { getListOfPatients } from "../../lib/slices/patientSlice";
import { getDoctors } from "../../lib/slices/doctorSlice";

export default function EditSurgery() {

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { loadingSurgery, loadingPut } = useSelector((state: RootState) => state.surgery)
    const navigate = useNavigate()

    const [data, setData] = useState({
        operation_name: '',
        patient_id: 0,
        doctor_id: 0,
        room_id: 0,
        duration: 0,
        schedule_date: ''
    })
    const [error, setError] = useState({
        operation_name: '',
        patient_id: '',
        doctor_id: '',
        room_id: '',
        duration: '',
        schedule_date: ''
    })
    const [errorFromBackend, setErrorFromBackend] = useState('')

    useEffect(() => {
        if (id) {
            dispatch(getSurgery(id)).unwrap().then(result => {
                setData({
                    operation_name: result.data.operation_name,
                    patient_id: result.data.patient.id,
                    doctor_id: result.data.doctor.id,
                    room_id: result.data.room.id,
                    duration: result.data.duration,
                    schedule_date: result.data.schedule_date
                })
            }).catch((error) => {
                console.log("🚀 ~ dispatch ~ error:", error.message)
                // const found = surgeries.find((surgery) => {
                //     return surgery.id === parseInt(id)
                // })

                // if (found)
                //     setData({
                //         operation_name: found.operation_name,
                //         patient_id: found.patient_id.id,
                //         doctor_id: found.doctor_id.id,
                //         room_id: found.room_id.id,
                //         duration: found.duration,
                //         schedule_date: found.schedule_date
                //     })
            })
        }
    }, [id, dispatch])

    const [allRooms, setAllRooms] = useState<{ id: number; name: string; }[]>([])
    const [allPatients, setAllPatients] = useState<{ id: number; name: string; }[]>([])
    const [allDoctors, setAllDoctors] = useState<{ id: number; name: string; }[]>([])
    useEffect(() => {
        dispatch(getListOfRooms()).unwrap().then(result => {
            setAllRooms(result.data.map((room:{id:number,room_number:number})=>{
                return{id:room.id,name:room.room_number.toString()}
            }))
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
        dispatch(getListOfPatients()).unwrap().then(result => {
            setAllPatients(result.data.map((patient:{id:number,name:string})=>{
                return{id:patient.id,name:patient.name}
            }))
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
        dispatch(getDoctors()).unwrap().then(result => {
            setAllDoctors(result.data.map((doctor:{id:number,name:string})=>{
                return{id:doctor.id,name:doctor.name}
            }))
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
    }, [dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleEdit = async () => {
        setError({
            operation_name: '',
            patient_id: '',
            doctor_id: '',
            room_id: '',
            duration: '',
            schedule_date: ''
        })
        try {
            await validateSurgery.validate(data, { abortEarly: false })
            // const formData = new FormData()
            // formData.append('operation_name', data.operation_name)
            // formData.append('patient_id', data.patient_id.toString())
            // formData.append('doctor_id', data.doctor_id.toString())
            // formData.append('doctor_ids', data.doctor_id.toString())
            // formData.append('room_id', data.room_id.toString())
            // formData.append('duration', data.duration.toString())
            // formData.append('schedule_date', data.schedule_date)

            const form={
                operation_name:data.operation_name,
                patient_id:data.patient_id,
                doctor_id:data.doctor_id,
                doctor_ids:[data.doctor_id],
                room_id:data.room_id,
                duration:data.duration,
                schedule_date:data.schedule_date,
            }

            if (id)
                dispatch(putSurgery({ data: form, id: id })).unwrap().then(() => {
                    navigate('/surgeries')
                }).catch((error) => {
                    setErrorFromBackend(error.message)
                })
        }
        catch (error: any) {
            error.inner.forEach(({ path, message }: { path: string, message: string }) => {
                setError(prev => ({ ...prev, [path]: message }))
            });
        }
    }

    return (
        <>
            {loadingSurgery === 'pending' ?
                <Loading />
                :
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

                    <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                        <Title title="Edit Surgery" />

                        <BasicTextField val={data.operation_name} handleChange={handleChange} error={error.operation_name} name="operation_name" label="Operation Name" />
                        <BasicSelect val={data.patient_id} setVal={setData} error={error.patient_id} name="patient_id" label="Patient" data={allPatients} />
                        <BasicSelect val={data.doctor_id} setVal={setData} error={error.doctor_id} name="doctor_id" label="Doctor" data={allDoctors} />
                        <BasicSelect val={data.room_id} setVal={setData} error={error.room_id} name="room_id" label="Room" data={allRooms} />
                        <BasicTextField val={data.duration} handleChange={handleChange} error={error.duration} name="duration" label="Duration (Hours)" />
                        <BasicSelectDate val={data.schedule_date} setVal={setData} error={error.schedule_date} name='schedule_date' label='Schedule Date' />

                        <div className="text-center text-red-500">{errorFromBackend}</div>
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