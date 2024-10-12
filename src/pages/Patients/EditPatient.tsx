import { useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validatePatient } from "../../validations/validation";
import Btn from "../../components/Btn";
import BasicSelect from "../../components/BasicSelect";
import BasicSelectDate from "../../components/BasicSelectDate";
import { useParams } from "react-router-dom";
import { patients } from "../../constants/data";

export default function EditPatient() {

    const { id } = useParams()

    const [data, setData] = useState({
        name: '',
        birth_date: new Date().toString(),
        gender:'',
        medical_description: '',
        address: '',
        mobile_number: ''
    })
    const [error, setError] = useState({
        name: '',
        birth_date: '',
        gender:'',
        medical_description: '',
        address: '',
        mobile_number: ''
    })

    useEffect(() => {
        if (id) {
            const found = patients.find((patient) => {
                return patient.id === parseInt(id)
            })

            if(found)
                setData(found)
        }
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleEdit = async () => {
        setError({
            name: '',
            birth_date: '',
            gender:'',
            medical_description: '',
            address: '',
            mobile_number: ''
        })
        try {
            await validatePatient.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('birth_date', data.birth_date)
            formData.append('gender', data.gender)
            formData.append('medical_description', data.medical_description)
            formData.append('address', data.address)
            formData.append('mobile_number', data.mobile_number)

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
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

            <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Edit Patient" />

                <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                <BasicSelectDate val={data.birth_date} setVal={setData} error={error.birth_date} name='birth_date' label='Birth Date'/>
                <BasicSelect val={data.gender} setVal={setData} error={error.gender} name="gender" label="Gender" data={[{ id: 'Male', name: 'Male' }, { id: 'Female', name: 'Female' }]} />
                <BasicTextField val={data.medical_description} handleChange={handleChange} error={error.medical_description} name="medical_description" label="Medical Description" />
                <BasicTextField val={data.address} handleChange={handleChange} error={error.address} name="address" label="Address" />
                <BasicTextField val={data.mobile_number} handleChange={handleChange} error={error.mobile_number} name="mobile_number" label="Mobile Number" />

                <Btn click={handleEdit} title="Edit" />

            </div>

        </div>
    )
}