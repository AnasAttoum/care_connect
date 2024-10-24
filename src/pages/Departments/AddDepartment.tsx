import { useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateDepartment } from "../../validations/validation";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { postDepartment } from "../../lib/slices/departmentSlice";
import { useNavigate } from "react-router-dom";

export default function AddDepartment() {

    const dispatch = useDispatch<AppDispatch>()
    const { loadingPost } = useSelector((state: RootState) => state.department)
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: '',
        phone_number: '',
        description: ''
    })
    const [error, setError] = useState({
        name: '',
        phone_number: '',
        description: ''
    })
    const [errorFromBackend, setErrorFromBackend] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleAdd = async () => {
        setError({
            name: '',
            phone_number: '',
            description: ''
        })
        try {
            await validateDepartment.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('phone_number', data.phone_number)
            formData.append('description', data.description)

            dispatch(postDepartment(formData)).unwrap().then(() => {
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
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

            <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Add Department" />

                <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                <BasicTextField val={data.phone_number} handleChange={handleChange} error={error.phone_number} name="phone_number" label="Phone Number" />
                <BasicTextField val={data.description} handleChange={handleChange} error={error.description} name="description" label="Description" />

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