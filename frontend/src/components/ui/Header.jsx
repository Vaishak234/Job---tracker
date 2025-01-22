import { AppBar, Container, Toolbar, Typography, IconButton, Box,  Avatar } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from "react-router-dom";
import AvatarMenu from "./AvatarMenu";
import { useState } from "react";


const Header = () => {


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar sx={{ bgcolor: "white", boxShadow: "none", height: "70px", borderBottom: "1px solid rgba(0,0,0,0.1)" }} position="relative">
            <Container maxWidth="xl" >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                    <Link to={'/admin'}>
                        <Typography variant="h4" fontWeight={'bold'} color="initial">Job Tracker</Typography>
                    </Link>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      

                        <IconButton >
                            <HelpOutlineIcon />
                        </IconButton>

                      
                          <AvatarMenu handleClose={handleClose} anchorEl={anchorEl} open={open} handleClick={handleClick} />

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
