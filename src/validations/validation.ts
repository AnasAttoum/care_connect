import * as Yup from 'yup'

export const validateLogIn = Yup.object({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    password: Yup.string().min(7, 'Password must be more than 7 characters').required('Invalid Password'),
})


export const validateDepartment = Yup.object({
    name: Yup.string().required('Inavalid name'),
    phone_number: Yup.string().required('Inavalid phone number'),
    description: Yup.string().required('Inavalid description')
})


export const validateRoom = Yup.object({
    room_number: Yup.number().min(1,'Inavalid Room Number').required('Inavalid Room Number'),
    status: Yup.string().required('Inavalid Status'),
    department_id: Yup.number().required('Inavalid Department'),
    type: Yup.string().required('Inavalid Type'),
    beds_number: Yup.number().min(1,'Inavalid Beds Number').required('Inavalid Beds Number')
})