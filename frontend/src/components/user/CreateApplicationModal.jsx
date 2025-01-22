import { Box, Button, FormControl, FormLabel, TextField, Select, MenuItem } from "@mui/material";
import ModalContainer from '../ui/Modal';
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import { applicationSchema } from "../../schema/application";
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useDispatch } from "react-redux";
import { createApplication } from "../../features/application/applicationActions";
import { toastError, toastSuccess } from "../../utils/toaster";

const CreateApplicationModal = ({ open, handleClose }) => {

    useAxiosPrivate()

  const dispatch = useDispatch()

    const initialValues = {
        company: 'company',
        position: 'India',
        status: 'applied',
        dateApplied: new Date(),
        note :'',
      
    };
   
const onSubmit = async (values) => {
    try {
        const response = await dispatch(createApplication(values)).unwrap();
      
        if(response){
            toastSuccess(response)
            handleClose()
        }
    } catch (error) {
        console.log(error);
        toastError(error)
    }
}


    const formik = useFormik({
        initialValues,
        validationSchema: applicationSchema,
        onSubmit,
        validateOnBlur: true,
        validateOnChange: true,
    });

    return (
        <div>
            <ModalContainer
                open={open}
                handleClose={handleClose}
                title="Create an Application"
                actions={
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={formik.handleSubmit} variant="contained" color="primary">
                            Create
                        </Button>
                    </Box>
                }
            >
                <Box sx={{
                    display: "flex", flexDirection: "column", gap: 2, textAlign: "start"
                }}
                >
                    {
                        ['company', 'position', 'status', 'dateApplied']?.map((field, index) => (
                            <FormControl key={index}>
                                <FormLabel htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                                {
                                   
                                    field === 'status' ? (
                                        <Select
                                            id={field}
                                            name={field}
                                            value={formik.values[field]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched[field] && Boolean(formik.errors[field])}
                                            helperText={formik.touched[field] && formik.errors[field]}
                                        >
                                           
                                                    <MenuItem value={'interviewing'} >Interviewing</MenuItem>
                                                    <MenuItem  value={'applied'} >Applied</MenuItem>
                                                    <MenuItem  value={'selected'} >Selected</MenuItem>
                                                    <MenuItem  value={'rejected'} >Rejected</MenuItem>
                                          
                                        </Select>
                                    ) : (
                                        <TextField
                                            placeholder={`Enter your ${field}`}
                                            id={field}
                                            name={field}
                                            type={field ==='dateApplied' ? 'date' : field}
                                            value={formik.values[field]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched[field] && Boolean(formik.errors[field])}
                                            helperText={formik.touched[field] && formik.errors[field]}
                                        />
                                    )
                                }
                            </FormControl>
                        ))
                    }
                </Box>
            </ModalContainer>
        </div>
    );
};

CreateApplicationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CreateApplicationModal;