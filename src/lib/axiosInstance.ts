import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND
})

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'multipart/form-data'
        return config;
    },
    (error) => {
        console.log(error)
        return error;
    }

)