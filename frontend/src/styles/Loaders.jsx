import { Box, CircularProgress } from "@mui/material"



export const BackgroundLoader = () => {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'fixed', top: 0, left: 0, right: 0
            , bottom: 0, backgroundColor: 'rgb(255, 255, 255)', zIndex: 1000
        }} >
            <CircularProgress color="black" size={30}/>
        </Box>
    )
}

