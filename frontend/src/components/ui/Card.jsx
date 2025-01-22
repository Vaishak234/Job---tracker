/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, CardHeader, Icon, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { deleteApplication } from '../../features/application/applicationActions';
import { useState } from 'react';
import EditApplicationModal from '../user/EditApplicationModal';

const CardUi = ({ application }) => {


  useAxiosPrivate()

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteApplication(application._id))

      console.log(response);

    } catch (error) {
      console.log(error);

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
      <Box item xs={12} sm={6} md={6} lg={4} xl={3} sx={{ maxWidth: '300px', width: "100%" }}>
        <Card sx={'CARD_PROPERTY'}>
          <CardHeader
            sx={{ p: 3 }}

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
                {application?.company}
              </Link>
            }
            subheader="September 14, 2016"
          />
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body1" color="black" sx={{ mb: 3 }}>
              status : {application?.status}
            </Typography>


            <Box sx={{ display: "flex", gap: 1 }}>
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
