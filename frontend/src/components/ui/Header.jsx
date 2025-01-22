import { AppBar, Container, Toolbar, Typography, IconButton, Box, TextField } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from "react-router-dom";
import AvatarMenu from "./AvatarMenu";
import { useEffect, useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../../styles/Search";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { searchApplication } from "../../features/application/applicationActions";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState('');
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchApplication({query:e.target.value}));
    };

    
    return (
        <AppBar sx={{ bgcolor: "white", boxShadow: "none", height: "70px", borderBottom: "1px solid rgba(0,0,0,0.1)" }} position="relative">
            <Container maxWidth="xl">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                    <Link to={'/admin'}>
                        <Typography variant="h4" fontWeight={'bold'} color="initial">Job Tracker</Typography>
                    </Link>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <TextField
                          id=""
                          label=""
                          placeholder="Search by Company"
                           value={search}
                           onChange={handleSearch}
                          
                        />
                        <IconButton>
                            <HelpOutlineIcon />
                        </IconButton>
                        <AvatarMenu handleClose={handleClose} anchorEl={anchorEl} open={open} handleClick={handleClick} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
