import toast from 'react-hot-toast';


export const toastSuccess = (response) => {
    let message = response.message ||response?.data?.message
    toast.success(message)
}

export const toastError = (error) => {
     const message = error?.message || error?.response?.message
     toast.error(message)
}