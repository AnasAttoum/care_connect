import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND
})

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json'
        return config;
    },
    (error) => {
        console.log(error)
        return error;
    }

)