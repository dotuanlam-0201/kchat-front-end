import axios, { AxiosError, AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";
import { redirect } from "next/navigation";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 10,
  validateStatus(status) {
    return status >= 200 && status < 400
  },
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = getCookie('accessToken')
  config.headers['Authorization'] = `Bearer ${accessToken}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

http.interceptors.response.use((data: AxiosResponse) => {
  return data.data
}, function (err: AxiosError) {
  if (err.status === 401) {
    deleteCookie('accessToken')
    redirect('/login')
  }
  throw err.response?.data
})

