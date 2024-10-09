import * as Yup from 'yup'

export const validateDepartment = Yup.object({
    name: Yup.string().required('Inavalid name'),
    phone_number: Yup.string().required('Inavalid phone number'),
    description: Yup.string().required('Inavalid description')
})

export const validateLogIn = Yup.object({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    password: Yup.string().min(7, 'Password must be more than 7 characters').required('Invalid Password'),
})