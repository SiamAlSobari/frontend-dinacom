import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { API_URL } from "./load-env";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || API_URL,
    withCredentials: true,
})

export const apiClient = async <T>(config:AxiosRequestConfig):Promise<T> => {
    const response = await axiosInstance(config)
    return response.data
}