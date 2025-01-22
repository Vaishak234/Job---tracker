import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { CustomScroll } from '../../styles/CustomScroll';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@mui/material';
import { useState } from 'react';
import CreateApplicationModal from './CreateApplicationModal';



const SidebarUser = () => {

    const [openModal ,setOpenModal] = useState(false)


   const  handleApplicationModal =  () =>{
          setOpenModal(true)
    }


    const handleClose = ()=>{
        setOpenModal(false)
    }


    return (
        <>
            <CustomScroll sx={{ bgcolor: 'white', width: '100%', maxWidth: 260, position: '' }}>
                <nav aria-label="main mailbox folders">
                    <List sx={{ bgcolor: 'white', px: 2 }}>
                        <Box sx={{ my: 2 }}>




                            <Button sx={{bgcolor:"primary.main",color:"white",width:"100%"}} onClick={handleApplicationModal}>
                                Create Application
                            </Button>


                            <Link to={'/'}>


                                <ListItem disablePadding sx={{ borderRadius: 3, p: 2, py: 1.5 }}>
                                    <ListItemIcon>
                                        <EmojiEventsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Applications" />

                                </ListItem>
                            </Link>


                            <Link to={'/'}>
                                <ListItem disablePadding sx={{ borderRadius: 3, p: 2, py: 1.5 }}>
                                    <ListItemIcon>
                                        <InsertDriveFileIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Forms" />

                                </ListItem>
                            </Link>


                        </Box>
                    </List>


                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Trash" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Spam" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </CustomScroll>


{
    openModal && (
        <CreateApplicationModal open={openModal} handleClose={handleClose}/>
    )
}

        </>
    );
};

export default SidebarUser;

