import dayjs from 'dayjs'
import * as Yup from 'yup'

export const validateLogIn = Yup.object({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    password: Yup.string().min(7, 'Password must be more than 7 characters').required('Invalid Password'),
})


export const validateDepartment = Yup.object({
    name: Yup.string().required('Invalid name').min(2,'Name must be more than 1 characters').max(20,'Name must be less than 20 characters'),
    phone_number: Yup.string().required('Invalid phone number').min(7,'Phone number must be more than 6 characters').max(10,'Phone number must be less than 20 characters'),
    description: Yup.string().required('Invalid description').min(2,'Description must be more than 1 characters').max(255,'Description must be less than 255 characters')
})


export const validateRoom = Yup.object({
    room_number: Yup.number().max(255, 'Invalid Room Number').required('Invalid Room Number'),
    status: Yup.string().required('Invalid Status'),
    department_id: Yup.number().required('Invalid Department'),
    type: Yup.string().required('Invalid Type'),
    beds_number: Yup.number().min(1, 'Beds must be more than 0').max(7, 'Beds must be less than 8').required('Invalid Beds Number')
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
    name: Yup.string().required('Invalid name').min(2,'Name must be more than 1 characters').max(20,'Name must be less than 20 characters'),
    description: Yup.string().required('Invalid description').min(2,'Description must be more than 1 characters').max(255,'Description must be less than 255 characters'),
    department_id: Yup.string().required('Invalid Department'),
})


export const validatePatient = Yup.object({
    name: Yup.string().required('Invalid name').min(2,'Name must be more than 1 characters').max(20,'Name must be less than 20 characters'),
    birth_date: Yup.string().required('Invalid Birth Date'),
    gender: Yup.string().oneOf(['male', 'female']).required('Invalid description'),
    medical_description: Yup.string().required('Invalid medical_description'),
    address: Yup.string().required('Invalid Address'),
    mobile_number: Yup.string().required('Invalid Mobile Number'),
})


export const validateSurgery = Yup.object({
    operation_name: Yup.string().required('Invalid Operation Name'),
    patient_id: Yup.string().required('Invalid Patient'),
    doctor_id: Yup.string().required('Invalid Doctor'),
    room_number: Yup.string().required('Invalid Room Number'),
    duration: Yup.number().required('Invalid Duration'),
    schedule_date: Yup.string().required('Invalid Date'),
})

export const validateMedicalRecord = Yup.object({
    doctor_id: Yup.string().required('Invalid Doctor'),
    room_id: Yup.string().required('Invalid Room Number'),
    blood_type: Yup.string().required('Invalid Blood Type'),
    admission_date: Yup.string().required('Invalid Date'),
    discharge_date: Yup.string().notRequired(),
    details: Yup.string().required('Invalid Details'),
})