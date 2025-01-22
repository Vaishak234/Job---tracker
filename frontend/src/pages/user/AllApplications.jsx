import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectApplications} from '../../features/application/applicationSlice'
import { getAllApplications } from '../../features/application/applicationActions'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import CardUi from '../../components/ui/Card'


const AllApplications = () => {

   useAxiosPrivate()
    const applications = useSelector(selectApplications)
    const dispatch = useDispatch()
    

    useEffect(()=>{

       dispatch(getAllApplications())

    },[dispatch ])

    
    
  return (
    <Box>
     

     <Box sx={{display:'flex', flexWrap:'wrap', gap:3 ,p:3 , width:'100%'}}>

        {
            applications && applications?.map((application,index)=> (
                <CardUi key={index} application={application}/>
            ))
        }


     </Box>

      
    </Box>
  )
}

export default AllApplications
