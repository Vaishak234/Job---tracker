import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CircularProgress, FormLabel, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from '../../schema/authentication';
import { useFormik } from 'formik';

// components 
import { CustomButton } from '../../styles/Button';
import { visibilityToggle } from '../../utils/visibilityToggle';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/User/UserActions';
import { toastError, toastSuccess } from '../../utils/toaster';

const AuthRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const initialValues = {
        name: 'vais',
        email: 'vaishakhp@gmail.com',
        password: '123456a',
        confirmPassword: '123456a',
    };

    const onSubmit = async ({ name, email, password }) => {
        try {
            const response = await dispatch(registerUser({ name, email, password })).unwrap();

            if (response) {
                console.log('Login successful:');
                navigate('/',{replace:true})
                toastSuccess(response)
            }
        } catch (error) {
            console.log('register user error', error);
            toastError(error)
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Box sx={{ width: '100%', p: 3, textAlign: "center", py: 6 }}>
            <Stack direction={'column'}>
                <Typography variant="h2" fontSize={27} sx={{ color: "secondary.main", fontWeight: "bold", mb: 1 }}>
                    Create an Account
                </Typography>
                <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "start" }}>
                    {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
                        <FormControl key={index}>
                            <FormLabel htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                            <TextField
                                id={field}
                                name={field}
                                placeholder={`Enter your ${field}`}
                                type={(field === 'password' && !showPassword) || (field === 'confirmPassword' && !showConfirmPassword) ? 'password' : 'text'}
                                fullWidth
                                variant="outlined"
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[field] && Boolean(formik.errors[field])}
                                helperText={formik.touched[field] && formik.errors[field]}
                                InputProps={(field === 'password' || field === 'confirmPassword') ? {
                                    endAdornment: (field === 'password'
                                        ? visibilityToggle(field, showPassword, handleClickShowPassword)
                                        : visibilityToggle(field, showConfirmPassword, handleClickShowConfirmPassword)),
                                } : null}
                            />
                        </FormControl>
                    ))}
                    <FormControlLabel control={<Checkbox value="remember" color="secondary" />} label="Remember me" />
                    <CustomButton type="submit" fullWidth variant="contained">
                        {formik.isSubmitting ? <CircularProgress size={22} color='white' /> : 'Create'}
                    </CustomButton>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link to="/login" variant="body2" sx={{ alignSelf: 'center' }}>Login</Link>
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default AuthRegister;
