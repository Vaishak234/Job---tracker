import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectApplications } from '../../features/application/applicationSlice'
import {  searchApplication } from '../../features/application/applicationActions'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import CardUi from '../../components/ui/Card'


const AllApplications = () => {

    useAxiosPrivate()
    const applications = useSelector(selectApplications)
    const dispatch = useDispatch()
    const [status, setStatus ] = useState('')
    const [page , setPage]  = useState(1)



    useEffect(() => {

        dispatch(searchApplication({status:status,page}))

    }, [dispatch ,status ,page])


    const handleStatusChange = (e)=>{
        setStatus(e.target.value)
    }

    const handleNext = ()=>{
        if(page <= applications.length / 5){
            setPage(page + 1)
        }
    }

    const handlePrev = ()=>{
        if(page > 1 ){
            setPage(page - 1)
        }
    }



    return (
        <Box sx={{display:'flex',  flexDirection:'column' ,p:3 ,width:'100%'}}>


         

                <Box  sx={{display:'flex', justifyContent:"end" , pr:3 ,m:2}} >
                    <Select 
                  
                        name={'status'}
                        value={status}
                        onChange={handleStatusChange}
                    >

                        <MenuItem value={'applied'} >Applied</MenuItem>
                        <MenuItem value={'interviewing'} >interviewing</MenuItem>
                        <MenuItem value={'rejected'} >Rejected</MenuItem>

                    </Select>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3,  width: '100%' }}>

                {
                    applications.length > 0 ? applications?.map((application, index) => (
                        <CardUi key={index} application={application} />
                    )) :(

                        <Box sx={{display:'flex', justifyContent:'center', p:3}}>
                          <Typography variant="body1" color="initial">No applications found for {status}</Typography>
                        </Box>
                    )
                }

                </Box>

                <Box sx={{m:2 , display:'flex', justifyContent:'space-between' ,alignItems:'center', gap:2}}>

                    <Button variant='contained' onClick={handlePrev}>Prev</Button>
                      {/* <Typography variant="body1" color="initial"> 10</Typography> */}
                    <Button variant='contained' onClick={handleNext}>Next</Button>
                </Box>


          

        </Box>
    )
}

export default AllApplications
