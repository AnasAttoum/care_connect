import * as Yup from 'yup'

export const validateDepartment = Yup.object({
    name: Yup.string().required('Inavalid name'),
    phone_number: Yup.string().required('Inavalid phone number'),
    description: Yup.string().required('Inavalid description')
})