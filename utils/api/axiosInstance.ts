import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config): InternalAxiosRequestConfig => {
  const token = Cookies.get('jxx')

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, undefined)

export {
  api
}