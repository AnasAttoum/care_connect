import { ChangeEvent, useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateDoctor } from "../../validations/validation";
import Btn from "../../components/Btn";
import { Button, FormHelperText } from "@mui/material";
import BasicSelect from "../../components/BasicSelect";
import { departments, doctors } from "../../constants/data";
import { department } from "../../constants/types";
import { useParams } from "react-router-dom";

export default function EditDoctor() {

    const { id } = useParams()

    const [data, setData] = useState({
        name: '',
        image: '/favicon.ico',
        speciality: '',
        department_id: 1,
        mobile_number: '',
        job_date: '',
        address: '',
        salary: 0
    })
    const [error, setError] = useState({
        name: '',
        image: '',
        speciality: '',
        department_id: '',
        mobile_number: '',
        job_date: '',
        address: '',
        salary: ''
    })

    const [allDepartments, setAllDepartments] = useState<{ id: number; name: string; }[]>([])
    useEffect(() => {
        setAllDepartments(departments.map((department: department) => { return { id: department.id, name: department.name } }))
    }, [])

    useEffect(() => {
        if (id) {
            const found = doctors.find((doctor) => {
                return doctor.id === parseInt(id)
            })
            if (found)
                setData(found)
        }
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }
    const handleSwitchImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newPic = e.target.files[0]

            const reader = new FileReader();
            reader.readAsDataURL(newPic);

            reader.onloadend = function () {
                setData(prev => ({ ...prev, image: reader.result as string }))
            }
        }

    }

    const handleAdd = async () => {
        setError({
            name: '',
            image: '',
            speciality: '',
            department_id: '',
            mobile_number: '',
            job_date: '',
            address: '',
            salary: ''
        })
        try {
            await validateDoctor.validate(data, { abortEarly: false })
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('image', data.image)
            formData.append('speciality', data.speciality)
            formData.append('department_id', data.department_id.toString())
            formData.append('mobile_number', data.mobile_number)
            formData.append('job_date', data.job_date)
            formData.append('address', data.address)
            formData.append('salary', data.salary.toString())

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

            <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl p-5" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                <Title title="Add Doctor" />


                <div className="flex flex-col justify-center items-center gap-5">
                    <img src={data.image} alt={data.name} style={{ height: '100px' }} />
                    <Button variant="contained" component="label" sx={{
                        backgroundColor: 'var(--primary)',
                        '&:hover': {
                            backgroundColor: 'var(--secondary)',
                        },
                    }}>
                        Upload File
                        <input type="file" accept="image/*" hidden onChange={handleSwitchImage} />
                    </Button>
                    <FormHelperText sx={{ color: '#d32f2f' }}>{error.image}</FormHelperText>
                </div>

                <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                <BasicTextField val={data.speciality} handleChange={handleChange} error={error.speciality} name="speciality" label="Speciality" />
                <BasicSelect val={data.department_id} setVal={setData} error={error.department_id} name="department_id" label="Department" data={allDepartments} />
                <BasicTextField val={data.mobile_number} handleChange={handleChange} error={error.mobile_number} name="mobile_number" label="Mobile Number" />
                <BasicTextField val={data.address} handleChange={handleChange} error={error.address} name="address" label="Address" />
                <BasicTextField val={data.salary} handleChange={handleChange} error={error.salary} name="salary" label="Salary" />
                <BasicTextField val={data.job_date} handleChange={handleChange} error={error.job_date} name="job_date" label="Job Date" />



                <Btn click={handleAdd} title="Add" />

            </div>

        </div>
    )
}