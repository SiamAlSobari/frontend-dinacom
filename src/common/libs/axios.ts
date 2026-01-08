import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true,
})

export const apiClient = async <T>(config:AxiosRequestConfig):Promise<T> => {
    const response = await axiosInstance(config)
    return response.data
}