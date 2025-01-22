import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { selectToken } from "../features/User/UserSlice";
import { axiosPrivate } from "../axios/axiosPrivate";
import { useEffect } from "react";


const useAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const accessToken = useSelector(selectToken);
        
    

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(config=> {
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },(error)=> Promise.reject(error)
    )

        const responseInterceptor = axiosPrivate.interceptors.response.use(response =>response,async(error)=>{
            const prevRequest = error?.config;
            if(error?.response?.status === 401 && !prevRequest?._retry){
                prevRequest._retry = true;
                const newAccessToken =  await refresh()
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest)
            }
            return Promise.reject(error)
        },
        
    )

        return() => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }

    },[accessToken,refresh]);


    return axiosPrivate;
};

export default useAxiosPrivate;
