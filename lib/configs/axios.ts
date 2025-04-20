import axios, { AxiosError, AxiosResponse } from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 10,
  validateStatus(status) {
    return status >= 200 && status < 400
  },
})

http.interceptors.response.use((data: AxiosResponse) => {
  return data.data
}, function (err: AxiosError) {
  throw err.response?.data
})

