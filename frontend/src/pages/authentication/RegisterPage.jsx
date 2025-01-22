

// project imports

import { Box, Container } from '@mui/material';
import AuthRegister from '../../components/authentication/AuthRegister';


const RegisterPage = () => {


    return (
        <Box sx={{ backgroundColor: "primary.light", minHeight: "100vh" }} >
        <Box sx={{ pt: 10, pb: 10 }} >
            <Container>
                <Box sx={{ maxWidth: "500px", backgroundColor: "white", borderRadius: 3, m: "auto" }}>
                    <AuthRegister />
                </Box>
            </Container>
        </Box>
        </Box>
    );
};

export default RegisterPage;
