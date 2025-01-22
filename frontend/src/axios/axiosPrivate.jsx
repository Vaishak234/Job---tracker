import axios from "./axios";


export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true

})
