import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../lib/store";
import { doctors, rooms } from "../../../constants/data";
import { doctor, room } from "../../../constants/types";
import { validateMedicalRecord } from "../../../validations/validation";
import { postMedicalRecord } from "../../../lib/slices/medicalRecords";
import Title from "../../../components/Title";
import Btn from "../../../components/Btn";
import BasicSelect from "../../../components/BasicSelect";
import BasicSelectDate from "../../../components/BasicSelectDate";
import BasicTextField from "../../../components/BasicTextField";

export default function AddMedicalRecord() {

    const dispatch = useDispatch<AppDispatch>()
    const { loadingPost } = useSelector((state: RootState) => state.medicalRecord)
    const navigate = useNavigate()
    const { patientId } = useParams()

    const [data, setData] = useState({
        doctor_id: 0,
        room_id: 0,
        blood_type: '',
        admission_date: '',
        discharge_date: '',
        medicines: '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleAdd = async () => {
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
            if (patientId) {
                const formData = new FormData()
                formData.append('patient_id', patientId)
                formData.append('doctor_id', data.doctor_id.toString())
                formData.append('room_id', data.room_id.toString())
                formData.append('blood_type', data.blood_type)
                formData.append('admission_date', data.admission_date)
                formData.append('discharge_date', data.discharge_date)
                formData.append('medicines', data.medicines)
                formData.append('details', data.details)

                dispatch(postMedicalRecord(formData)).unwrap().then(() => {
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
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

            <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Add Medical Record" />

                <BasicSelect val={data.doctor_id} setVal={setData} error={error.doctor_id} name="doctor_id" label="Doctor" data={allDoctors} />
                <BasicSelect val={data.room_id} setVal={setData} error={error.room_id} name="room_id" label="Room" data={allRooms} />
                <BasicSelect val={data.blood_type} setVal={setData} error={error.blood_type} name="blood_type" label="Blood Type" data={[{ id: 'A+', name: 'A+' }, { id: 'A-', name: 'A-' }, { id: 'B+', name: 'B+' }, { id: 'B-', name: 'B-' },{ id: 'O+', name: 'O+' }, { id: 'O-', name: 'O-' },{ id: 'AB+', name: 'AB+' }, { id: 'AB-', name: 'AB-' }]} />
                <BasicSelectDate val={data.admission_date} setVal={setData} error={error.admission_date} name='admission_date' label='Admission Date'/>
                <BasicSelectDate val={data.discharge_date} setVal={setData} error={error.discharge_date} name='discharge_date' label='Discharge Date'/>
                <BasicTextField val={data.details} handleChange={handleChange} error={error.details} name="details" label="Details" />
                <BasicTextField val={data.medicines} handleChange={handleChange} error={error.medicines} name="medicines" label="Mediciines" />

                <Btn click={handleAdd} title="Add" />
                {loadingPost === 'pending' &&
                    <div className="flex justify-center my-5">
                        <div className="loader"></div>
                    </div>
                }

            </div>

        </div>
    )
}