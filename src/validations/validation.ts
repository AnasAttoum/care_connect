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
    room_number: Yup.number().min(1,'Invalid Room Number').required('Invalid Room Number'),
    status: Yup.string().required('Invalid Status'),
    department_id: Yup.number().required('Invalid Department'),
    type: Yup.string().required('Invalid Type'),
    beds_number: Yup.number().min(1,'Invalid Beds Number').required('Invalid Beds Number')
})


export const validateDoctor = Yup.object({
    name: Yup.string().required('Invalid name'),
    image: Yup.string().notOneOf(['/favicon.ico'],'Invalid Image').required('Invalid Image'),
    speciality: Yup.string().required('Invalid Speciality'),
    department_id: Yup.string().required('Invalid Department'),
    mobile_number: Yup.string().required('Invalid Mobile Number'),
    job_date: Yup.string().required('Invalid Job Date'),
    address: Yup.string().required('Invalid Address'),
    salary: Yup.number().required('Invalid Salary')
})