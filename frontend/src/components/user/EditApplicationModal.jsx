/* eslint-disable react/prop-types */
import { Box, Button, FormControl, FormLabel, TextField, Select, MenuItem } from "@mui/material";
import ModalContainer from '../ui/Modal';
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import { applicationSchema } from "../../schema/application";
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useDispatch } from "react-redux";
import { updateApplication } from "../../features/application/applicationActions";
import { toastError, toastSuccess } from "../../utils/toaster";

const EditApplicationModal = ({ open, handleClose , application }) => {

    useAxiosPrivate()

  const dispatch = useDispatch()

   console.log(application.dateApplied);
   

    const initialValues = {
        company: application?.company || '',
        position: application?.position || '',
        status: application?.status || '',
        dateApplied: application?.dateApplied || '',
        note: application?.note || '',
    };
   
const onSubmit = async (values) => {
    try {
        
        const applicationdata = {
            _id : application._id,
            company: values.company,
            position: values.position,
            status: values.status,
            dateApplied: values.dateApplied.split('T')[0],
            note: values.note

        }
        const response = await dispatch(updateApplication(applicationdata)).unwrap();

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
                title="Edit Application"
                actions={
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={formik.handleSubmit} variant="contained" color="primary">
                            Edit
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

EditApplicationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default EditApplicationModal;