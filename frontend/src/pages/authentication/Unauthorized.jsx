import { Box, Typography } from '@mui/material';


const Unauthorized = () => {
    
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="background.default"
            color="text.primary"
        >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography variant="h3" sx={{ fontSize: { xs: '24px', md: '42px' }, fontWeight: 'bold' }}>
                    403
                </Typography>
                <Typography variant="h3" sx={{ fontSize: { xs: '20px', md: '30px' }, fontWeight: 'bold' }}>
                    Unauthorized access 
                </Typography>

                {/* <Link to={'/'}>Go to Home</Link> */}
            </Box>
        </Box>
    );
}

export default Unauthorized;
