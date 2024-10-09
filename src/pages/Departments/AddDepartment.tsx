import { useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateDepartment } from "../../validations/validation";

export default function AddDepartment() {

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
            
            console.log(formData)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            error.inner.forEach(({ path, message }: { path: string, message: string }) => {
                setError(prev => ({ ...prev, [path]: message }))
            });
        }
    }

    return (
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)' }}>

            <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Add Department" />

                <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                <BasicTextField val={data.phone_number} handleChange={handleChange} error={error.phone_number} name="phone_number" label="Phone Number" />
                <BasicTextField val={data.description} handleChange={handleChange} error={error.description} name="description" label="Description" />

                <div className="flex justify-center my-5">
                    <div className="text-white py-2 px-10 rounded-md cursor-pointer bg-[--primary] hover:bg-[--secondary]" onClick={handleAdd}>Add</div>
                </div>

            </div>

        </div>
    )
}