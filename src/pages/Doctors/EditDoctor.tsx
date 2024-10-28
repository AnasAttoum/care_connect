import { ChangeEvent, useEffect, useState } from "react";
import Title from "../../components/Title";
import BasicTextField from "../../components/BasicTextField";
import { validateDoctor } from "../../validations/validation";
import Btn from "../../components/Btn";
import { Button, createTheme, FormHelperText, ThemeProvider } from "@mui/material";
import BasicSelect from "../../components/BasicSelect";
import { useNavigate, useParams } from "react-router-dom";
import BasicSelectDate from "../../components/BasicSelectDate";
import { Checkbox, List, ListItem } from "@mui/joy";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { getDoctor, putDoctor } from "../../lib/slices/doctorSlice";
import Loading from "../Loading";
import { getDepartments } from "../../lib/slices/departmentSlice";

const theme = createTheme({
    palette: {
        primary: {
            main: '#353b55',
        },
    },
});

export default function EditDoctor() {

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { loadingDoctor, loadingPut } = useSelector((state: RootState) => state.doctor)
    const navigate = useNavigate()

    const [data, setData] = useState<{ name: string, image: string, speciality: string, department_id: number, mobile_number: string, job_date: string, address: string, salary: number, days: string[], fromTo: string[] }>({
        name: '',
        image: '/favicon.ico',
        speciality: '',
        department_id: 1,
        mobile_number: '',
        job_date: '',
        address: '',
        salary: 0,
        days: [],
        fromTo: [new Date().toString(), new Date().toString()]
    })
    const [error, setError] = useState({
        name: '',
        image: '',
        speciality: '',
        department_id: '',
        mobile_number: '',
        job_date: '',
        address: '',
        salary: '',
        days: '',
        fromTo: ''
    })

    const [allDepartments, setAllDepartments] = useState<{ id: number; name: string; }[]>([])
    useEffect(() => {
        dispatch(getDepartments()).unwrap().then(result => {
            setAllDepartments(result.data)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
    }, [dispatch])

    useEffect(() => {
        if (id) {
            dispatch(getDoctor(id)).unwrap().then(result => {
                console.log(dayjs().format()+result.data.start_work)
                setData({
                    name: result.data.name,
                    image: import.meta.env.VITE_API_Server + result.data.image,
                    speciality: result.data.speciality,
                    department_id: result.data.department.id,
                    mobile_number: result.data.mobile_number,
                    job_date: result.data.job_date,
                    address: result.data.address,
                    salary: result.data.salary,
                    days: result.data.days,
                    fromTo: [dayjs().format('YYYY-MM-DD')+result.data.start_work, dayjs().format('YYYY-MM-DD')+result.data.end_work]
                })
            }).catch((error) => {
                console.log("🚀 ~ dispatch ~ error:", error.message)
                // const found = doctors.find((doctor) => {
                //     return doctor.id === parseInt(id)
                // })
                // if (found)
                //     setData({
                //         name: found.name,
                //         image: found.image,
                //         speciality: found.speciality,
                //         department_id: found.department.id,
                //         mobile_number: found.mobile_number,
                //         job_date: found.job_date,
                //         address: found.address,
                //         salary: found.salary,
                //         days: found.days,
                //         fromTo: [dayjs(found.fromTo[0],'HH:mm:ss').toString(),dayjs(found.fromTo[1],'HH:mm:ss').toString()]
                // })
            })
        }
    }, [id, dispatch])

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

    const handleEdit = async () => {
        setError({
            name: '',
            image: '',
            speciality: '',
            department_id: '',
            mobile_number: '',
            job_date: '',
            address: '',
            salary: '',
            days: '',
            fromTo: ''
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
            
            console.log(dayjs(data.fromTo[0]).format('HH:mm:ss'))

            if (id)
                dispatch(putDoctor({ data: formData, id: id })).unwrap().then(() => {
                    navigate('/doctors')
                }).catch((error) => {
                    console.log("🚀 ~ dispatch ~ error:", error.message)
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
            {loadingDoctor === 'pending' ?
                <Loading />
                :
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>

                    <div className="w-screen sm:w-2/3 bg-white rounded-none sm:rounded-2xl p-5" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

                        <Title title="Edit Doctor" />


                        <div className="flex flex-col justify-center items-center gap-5">
                            <img src={data.image} alt={data.name} style={{ height: '100px' }} />
                            <Button variant="contained" component="label" sx={{
                                backgroundColor: 'var(--primary)',
                                '&:hover': {
                                    backgroundColor: 'var(--secondary)',
                                },
                            }}>
                                Upload Profile Image
                                <input type="file" accept="image/*" hidden onChange={handleSwitchImage} />
                            </Button>
                            <FormHelperText sx={{ color: '#d32f2f' }}>{error.image}</FormHelperText>
                        </div>

                        <BasicTextField val={data.name} handleChange={handleChange} error={error.name} name="name" label="Name" />
                        <BasicTextField val={data.speciality} handleChange={handleChange} error={error.speciality} name="speciality" label="Speciality" />
                        <BasicSelect val={data.department_id} setVal={setData} error={error.department_id} name="department_id" label="Department" data={allDepartments} />
                        <BasicTextField val={data.mobile_number} handleChange={handleChange} error={error.mobile_number} name="mobile_number" label="Mobile Number" />
                        <BasicTextField val={data.address} handleChange={handleChange} error={error.address} name="address" label="Address" />
                        <div className="flex flex-col justify-center items-center" style={{ marginBlock: '20px' }}>
                            <div className="px-2 mb-2 text-gray-500" style={{ width: '80%' }}>Working days:</div>
                            <List
                                orientation="horizontal"
                                wrap
                                sx={{ '--List-gap': '8px', '--ListItem-radius': '20px', width: '80%' }}
                            >
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
                                ].map((item) => (
                                    <ListItem key={item}>
                                        <Checkbox
                                            // disabled={index === 0}
                                            // defaultChecked={data.days.includes(item)}
                                            checked={data.days.includes(item)}
                                            value={item}
                                            overlay
                                            disableIcon
                                            variant="outlined"
                                            label={item}
                                            onChange={(e) => {
                                                if (e.currentTarget.checked) {
                                                    setData(prev => ({
                                                        ...prev,
                                                        days: [...prev.days, e.currentTarget.value]
                                                    }))
                                                }
                                                else
                                                    setData(prev => ({
                                                        ...prev,
                                                        days: data.days.filter((day) => {
                                                            return day !== e.currentTarget.value
                                                        })
                                                    }))
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <div className="px-2 mt-2 text-gray-500" style={{ width: '80%' }}><FormHelperText sx={{ color: '#d32f2f' }}>{error.days}</FormHelperText></div>
                        </div>
                        <div className="flex flex-col justify-center items-center" style={{ marginBlock: '20px' }}>
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'MobileTimePicker',
                                        ]}
                                        sx={{ width: '80%', display: 'flex', gap: "10%" }}
                                    >
                                        <DemoItem label="Start of work:">
                                            <MobileTimePicker defaultValue={dayjs(data.fromTo[0])} value={dayjs(data.fromTo[0])} onChange={(e) => { if (e) setData(prev => ({ ...prev, fromTo: [e.format(), prev.fromTo[1]] })) }} />
                                        </DemoItem>

                                        <DemoItem label="End of work:">
                                            <MobileTimePicker defaultValue={dayjs(data.fromTo[1])} value={dayjs(data.fromTo[1])} onChange={(e) => { if (e) setData(prev => ({ ...prev, fromTo: [prev.fromTo[0], e.format()] })) }} />
                                        </DemoItem>
                                    </DemoContainer>
                                    <div className="px-2 mt-2 text-gray-500" style={{ width: '80%' }}><FormHelperText sx={{ color: '#d32f2f' }}>{error.fromTo}</FormHelperText></div>
                                </LocalizationProvider>
                            </ThemeProvider>
                        </div>
                        <BasicTextField val={data.salary} handleChange={handleChange} error={error.salary} name="salary" label="Salary" />
                        <BasicSelectDate val={data.job_date} setVal={setData} error={error.job_date} name='job_date' label='Job Date' />



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