import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from '../components/ui/Header'
import SidebarUser from '../components/user/SidebarUser'


const MainLayout = () => {
    


  return (
    <Box sx={{ backgroundColor: "primary.light", minHeight: "100vh" }} >
            <Header />

            <Box component={'main'} sx={{display:'flex'}}>

                <SidebarUser />

                 <Outlet />
            </Box>

        </Box>
  )
}

export default MainLayout
