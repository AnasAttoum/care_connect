import { useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateService } from "../../validations/validation";
import Btn from "../../components/Btn";
import BasicSelect from "../../components/BasicSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import { postService } from "../../lib/slices/serviceSlice";
import { getDepartments } from "../../lib/slices/departmentSlice";

export default function AddService() {

    const dispatch = useDispatch<AppDispatch>()
    const { loadingPost } = useSelector((state: RootState) => state.service)
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: '',
        description: '',
        department_id: 1,
    })
    const [error, setError] = useState({
        name: '',
        description: '',
        department_id: '',
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
            name: '',
            description: '',
            department_id: '',
        })
        try {
            await validateService.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('department_id', data.department_id.toString())

            dispatch(postService(formData)).unwrap().then(() => {
                navigate('/services')
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

                <Title title="Add Service" />

                <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                <BasicTextField val={data.description} handleChange={handleChange} error={error.description} name="description" label="Description" />
                <BasicSelect val={data.department_id} setVal={setData} error={error.department_id} name="department_id" label="Department" data={allDepartments} />

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