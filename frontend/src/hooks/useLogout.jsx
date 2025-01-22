import  { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/User/UserActions';
import {toastSuccess} from '../utils/toaster'

const useLogout = () => {

    const dispatch = useDispatch()

    const logout = useCallback(async () => {
        try {
            let response = await dispatch(logoutUser()).unwrap()
            
            toastSuccess(response)

        } catch (error) {
            console.log(error);
        }
    }, [dispatch])

    return logout
}

export default useLogout
