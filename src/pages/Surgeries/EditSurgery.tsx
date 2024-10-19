import { useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateSurgery } from "../../validations/validation";
import Btn from "../../components/Btn";
import BasicSelect from "../../components/BasicSelect";
import { doctors, patients, rooms, surgeries } from "../../constants/data";
import BasicSelectDate from "../../components/BasicSelectDate";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { getSurgery, putSurgery } from "../../lib/slices/SurgeriesSlice";
import Loading from "../Loading";

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

    useEffect(() => {
        if (id) {
            dispatch(getSurgery(id)).unwrap().then(result => {
                console.log(result)
            }).catch((error) => {
                console.log("🚀 ~ dispatch ~ error:", error.message)
                const found = surgeries.find((surgery) => {
                    return surgery.id === parseInt(id)
                })

                if (found)
                    setData({
                        operation_name: found.operation_name,
                        patient_id: found.patient_id.id,
                        doctor_id: found.doctor_id.id,
                        room_id: found.room_id.id,
                        duration: found.duration,
                        schedule_date: found.schedule_date
                    })
            })
        }
    }, [id, dispatch])

    const [resources, setResources] = useState<{ patients: { id: number, name: string }[], doctors: { id: number, name: string }[], rooms: { id: number, name: string }[] }>({ patients: [], doctors: [], rooms: [] })
    useEffect(() => {
        setResources(prev => ({
            ...prev,
            patients: patients.map((patient) => {
                return { id: patient.id, name: patient.name }
            }),
            doctors: doctors.map((doctor) => {
                return { id: doctor.id, name: doctor.name }
            }),
            rooms: rooms.map((room) => {
                return { id: room.id, name: room.room_number.toString() }
            })
        }))
    }, [])

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
            const formData = new FormData()
            formData.append('operation_name', data.operation_name)
            formData.append('patient_id', data.patient_id.toString())
            formData.append('doctor_id', data.doctor_id.toString())
            formData.append('room_id', data.room_id.toString())
            formData.append('duration', data.duration.toString())
            formData.append('schedule_date', data.schedule_date)

            if (id)
                dispatch(putSurgery({ data: formData, id: id })).unwrap().then(() => {
                    navigate('/surgery')
                }).catch((error) => {
                    console.log("🚀 ~ dispatch ~ error:", error.message)
                })
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
            {loadingSurgery === 'pending' ?
                <Loading />
                :
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

                    <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                        <Title title="Edit Surgery" />

                        <BasicTextField val={data.operation_name} handleChange={handleChange} error={error.operation_name} name="operation_name" label="Operation Name" />
                        <BasicSelect val={data.patient_id} setVal={setData} error={error.patient_id} name="patient_id" label="Patient" data={resources.patients} />
                        <BasicSelect val={data.doctor_id} setVal={setData} error={error.doctor_id} name="doctor_id" label="Doctor" data={resources.doctors} />
                        <BasicSelect val={data.room_id} setVal={setData} error={error.room_id} name="room_id" label="Room" data={resources.rooms} />
                        <BasicTextField val={data.duration} handleChange={handleChange} error={error.duration} name="duration" label="Duration (Hours)" />
                        <BasicSelectDate val={data.schedule_date} setVal={setData} error={error.schedule_date} name='schedule_date' label='Schedule Date' />

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