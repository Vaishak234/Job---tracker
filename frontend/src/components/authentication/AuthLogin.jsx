import  { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { FormLabel, TextField, Divider, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schema/authentication';
import { useFormik } from 'formik';
import GoogleIcon from '../../assets/googleIcon.png'
// components 
import { CustomButton, GoogleButton } from '../../styles/Button';
import { visibilityToggle } from '../../utils/visibilityToggle';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/User/UserActions';
import { toastError, toastSuccess } from '../../utils/toaster';
import usePersist from '../../hooks/usePersist';

const AuthLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const location = useLocation()
    const [persist , setPersist] = usePersist()

    // const from = location.state?.from?.pathname || '/';

    const initialValues = {
        email: 'admin@gmail.com',
        password: '123456a',
    };

    const onSubmit = async (values) => {
       try {
           const response= await dispatch(loginUser(values)).unwrap();
           
           if (response?.data && response?.data?.user?.role) {
               let role =  response?.data?.user?.role
               
               if(role === 'admin'){

                   navigate('/admin', { replace: true })
                   toastSuccess({message:'You are Logged in as Admin'})
               }else if(role === 'user'){

                   navigate('/', { replace: true })
                   toastSuccess(response)
               }
           }

       } catch (error) {
          console.log('Login failed:', error);
          toastError(error)
       }
    };

    // formik for handling form data validation and submission
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

   

    return (
        <Box sx={{ width: '100%', p: 3, textAlign: "center", py: 6 }}>
            <Stack direction={'column'}>
                <Stack direction={'column'}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="h2" fontSize={26} sx={{ color: "secondary.main", fontWeight: "bold", mb: 1 }}>Hi, Welcome Back</Typography>
                        <GoogleButton>
                            <img style={{ width: "30px" }} src={GoogleIcon} alt="" />
                            Sign IN With Google
                        </GoogleButton>
                    </Box>

                    <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}>
                        <Divider sx={{ flexGrow: 1 }} />
                        <Typography variant="body1" color="initial">
                            OR
                        </Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                    </Stack>
                </Stack>
                <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "start" }}>
                    {['email', 'password'].map((field, index) => (
                        <FormControl key={index}>
                            <FormLabel htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                            <TextField
                                id={field}
                                name={field}
                                placeholder={`Enter your ${field}`}
                                type={(field === 'password' && !showPassword) ? 'password' : 'text'}
                                fullWidth
                                variant="outlined"
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field] && Boolean(formik.errors[field])}
                                helperText={formik.touched[field] && formik.errors[field]}
                                InputProps={(field === 'password' ? { endAdornment: visibilityToggle(field , showPassword, handleClickShowPassword) } : null)}
                            />
                        </FormControl>
                    ))}

                    <FormControlLabel
                          control={<Checkbox value="remember"
                          checked={persist} 
                          onChange={(e) => setPersist(e.target.checked)}
                          color="secondary" />}
                     label="Remember me" />

                        <CustomButton type="submit" fullWidth variant="contained">
                            {formik.isSubmitting ? <CircularProgress size={22} color='white' /> : 'Sign in'}
                        </CustomButton>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link to="/register" variant="body2" sx={{ alignSelf: 'center' }}>Create</Link>
                    </Typography>
                </Box>
            </Stack> 
        </Box>
    );
};

export default AuthLogin;
