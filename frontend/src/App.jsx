import { Box } from "@mui/material"
import { RouterProvider } from "react-router-dom"
import router from "./route"
import  { Toaster } from 'react-hot-toast';


function App() {
 

  return (
    <Box >
        
        <RouterProvider router={router} />

         <Toaster />
         
    </Box>
  )
}

export default App
