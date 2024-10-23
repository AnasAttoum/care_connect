import { useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateDepartment } from "../../validations/validation";
import { useNavigate, useParams } from "react-router-dom";
import { departments } from "../../constants/data";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { getDepartment, putDepartment } from "../../lib/slices/departmentSlice";
import Loading from "../Loading";

export default function EditDepartment() {

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { loadingDepartment, loadingPut } = useSelector((state: RootState) => state.department)
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: '',
        phone_number: 0,
        description: ''
    })
    const [error, setError] = useState({
        name: '',
        phone_number: '',
        description: ''
    })
    const [errorFromBackend, setErrorFromBackend] = useState('')

    useEffect(() => {
        if (id) {
            dispatch(getDepartment(id)).unwrap().then(result => {
                setData({
                    name: result.data.name,
                    phone_number: result.data.phone_number,
                    description: result.data.description,
                })
            }).catch((error) => {
                console.log("🚀 ~ dispatch ~ error:", error.message)
                const found = departments.find((department) => {
                    return department.id === parseInt(id)
                })
                if (found)
                    setData(found)
            })
        }
    }, [id, dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleEdit = async () => {
        setError({
            name: '',
            phone_number: '',
            description: ''
        })
        setErrorFromBackend('')
        try {
            await validateDepartment.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('phone_number', data.phone_number.toString())
            formData.append('description', data.description)

            if (id)
                dispatch(putDepartment({ data: formData, id: id })).unwrap().then(() => {
                    navigate('/')
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
            {
                loadingDepartment === 'pending' ?
                    <Loading />
                    :
                    <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

                        <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                            <Title title="Edit Department" />

                            <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                            <BasicTextField val={data.phone_number} handleChange={handleChange} error={error.phone_number} name="phone_number" label="Phone Number" />
                            <BasicTextField val={data.description} handleChange={handleChange} error={error.description} name="description" label="Description" />

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