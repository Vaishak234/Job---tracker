import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
    


  return (
    <Box sx={{backgroundColor:"primary.light" ,minHeight:"100vh"}} >

      
       <Outlet />
       
      
    </Box>
  )
}

export default AuthLayout
