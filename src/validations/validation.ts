import dayjs from 'dayjs'
import * as Yup from 'yup'

export const validateLogIn = Yup.object({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    password: Yup.string().min(7, 'Password must be more than 7 characters').required('Invalid Password'),
})


export const validateDepartment = Yup.object({
    name: Yup.string().required('Invalid name'),
    phone_number: Yup.string().required('Invalid phone number'),
    description: Yup.string().required('Invalid description')
})


export const validateRoom = Yup.object({
    room_number: Yup.number().min(1, 'Invalid Room Number').required('Invalid Room Number'),
    status: Yup.string().required('Invalid Status'),
    department_id: Yup.number().required('Invalid Department'),
    type: Yup.string().required('Invalid Type'),
    beds_number: Yup.number().min(1, 'Invalid Beds Number').required('Invalid Beds Number')
})


export const validateDoctor = Yup.object({
    name: Yup.string().required('Invalid name'),
    image: Yup.string().notOneOf(['/favicon.ico'], 'Invalid Image').required('Invalid Image'),
    speciality: Yup.string().required('Invalid Speciality'),
    department_id: Yup.string().required('Invalid Department'),
    mobile_number: Yup.string().required('Invalid Mobile Number'),
    job_date: Yup.string().required('Invalid Job Date'),
    address: Yup.string().required('Invalid Address'),
    salary: Yup.number().required('Invalid Salary'),
    days: Yup.array().of(Yup.string()).min(1, 'You must choose at least one day').required('Invalid Address'),
    fromTo: Yup.array().of(Yup.string()).test('', 'Invalid Range', (arr) => {
        if (arr && arr[0] && arr[1]) {
            const date1 = dayjs(arr[0]).format('HH-mm').slice(0, 2)
            const date2 = dayjs(arr[1]).format('HH-mm').slice(0, 2)
            if (parseInt(date1) !== parseInt(date2))
                return parseInt(date1) - parseInt(date2) < 0
            else
                return parseInt(dayjs(arr[0]).format('HH-mm').slice(3, 5)) - parseInt(dayjs(arr[1]).format('HH-mm').slice(3, 5)) < 0
        }
    }).required('Invalid Address'),
})


export const validateService = Yup.object({
    name: Yup.string().required('Invalid name'),
    description: Yup.string().required('Invalid description'),
    department_id: Yup.string().required('Invalid Department'),
})


export const validatePatient = Yup.object({
    name: Yup.string().required('Invalid name'),
    birth_date: Yup.string().required('Invalid Birth Date'),
    gender: Yup.string().oneOf(['Male', 'Female']).required('Invalid description'),
    medical_description: Yup.string().required('Invalid medical_description'),
    address: Yup.string().required('Invalid Address'),
    mobile_number: Yup.string().required('Invalid Mobile Number'),
})


export const validateSurgery = Yup.object({
    operation_name: Yup.string().required('Invalid Operation Name'),
    patient_id: Yup.string().required('Invalid Patient'),
    doctor_id: Yup.string().required('Invalid Doctor'),
    room_number: Yup.string().required('Invalid Room Number'),
    duration: Yup.string().required('Invalid Duration'),
    schedule_date: Yup.string().required('Invalid Date'),
})