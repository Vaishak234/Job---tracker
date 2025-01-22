/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, CardHeader, Icon, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { deleteApplication } from '../../features/application/applicationActions';
import { useState } from 'react';
import EditApplicationModal from '../user/EditApplicationModal';
import { toastError, toastSuccess } from '../../utils/toaster';

const CardUi = ({ application }) => {


  useAxiosPrivate()

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteApplication(application._id)).unwrap()
      
       if(response){
        toastSuccess({message:'application deleted successfully'})
       }
    } catch (error) {
      console.log(error);
      toastError(error)

    }
  }

  const handleEdit = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <>
      <Box item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ maxWidth: '280px', width: "100%" }}>
        <Card sx={'CARD_PROPERTY'}>
          <CardHeader
            sx={{ px: 3 }}

            action={
              <IconButton aria-label="settings">
                <Icon path={MoreVertIcon} size={1.3} color="#222" />
              </IconButton>
            }
            title={
              <Link
                href="#"
                variant="body1"
                color="black"
                underline="none"
                sx={{ fontWeight: "medium" }}
              >
                {application?.position}
              </Link>
            }
            subheader={application?.company}
          />
          
          <CardContent sx={{ px: 3 }}>
            <Typography variant="body1" color="black" sx={{ mb: 1 }}>
              status : {application?.status}
            </Typography>

            <Typography variant="caption" color="initial">{`Applied : ${application.dateApplied.split('T')[0]}`}</Typography>

            <Box sx={{ display: "flex", gap: 1 ,mt:1 }}>
              <Button variant="outlined" onClick={handleDelete}>delete</Button>
              <Button variant="contained" onClick={handleEdit}>Edit</Button>
            </Box>

          </CardContent>
        </Card>
      </Box>

      {
        open && <EditApplicationModal open={open} handleClose={handleClose} application={application} />
      }

    </>

  )
}

export default CardUi
