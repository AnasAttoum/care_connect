import { useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateRoom } from "../../validations/validation";
import Btn from "../../components/Btn";
import BasicSelect from "../../components/BasicSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import { postRoom } from "../../lib/slices/roomSlice";
import { getDepartments } from "../../lib/slices/departmentSlice";

export default function AddRoom() {

    const dispatch = useDispatch<AppDispatch>()
    const { loadingPost } = useSelector((state: RootState) => state.room)
    const navigate = useNavigate()

    const [data, setData] = useState({
        room_number: 0,
        status: '',
        department_id: 1,
        type: '',
        beds_number: 0
    })
    const [error, setError] = useState({
        room_number: '',
        status: '',
        department_id: '',
        type: '',
        beds_number: ''
    })
    const [errorFromBackend, setErrorFromBackend] = useState('')

    const [allDepartments, setAllDepartments] = useState<{ id: number; name: string; }[]>([])
    useEffect(() => {
        dispatch(getDepartments()).unwrap().then(result => {
            setAllDepartments(result.data)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
    }, [dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleAdd = async () => {
        setError({
            room_number: '',
            status: '',
            department_id: '',
            type: '',
            beds_number: ''
        })
        try {
            await validateRoom.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('room_number', data.room_number.toString())
            formData.append('status', data.status)
            formData.append('department_id', data.department_id.toString())
            formData.append('type', data.type)
            formData.append('beds_number', data.beds_number.toString())

            dispatch(postRoom(formData)).unwrap().then(() => {
                navigate('/rooms')
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
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

            <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Add Room" />

                <BasicTextField val={data.room_number} handleChange={handleChange} error={error.room_number} name="room_number" label="Room Number" />
                <BasicSelect val={data.status} setVal={setData} error={error.status} name="status" label="Status" data={[{ id: 'occupied', name: 'Occupied' }, { id: 'vacant', name: 'Vacant' }, { id: 'underMaintenance', name: 'Under Maintenance' }]} />
                <BasicSelect val={data.department_id} setVal={setData} error={error.department_id} name="department_id" label="Department" data={allDepartments} />
                <BasicSelect val={data.type} setVal={setData} error={error.type} name="type" label="Type" data={[{ id: 'general', name: 'General' }, { id: 'ICU', name: 'ICU' }, { id: 'surgical', name: 'Surgical' }]} />
                <BasicTextField val={data.beds_number} handleChange={handleChange} error={error.beds_number} name="beds_number" label="Beds Number" />

                <div className="text-center text-red-500">{errorFromBackend}</div>
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