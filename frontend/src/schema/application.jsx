 import * as Yup from 'yup';

export  const applicationSchema = Yup.object({
        company: Yup.string().required('Company is required'),
        position: Yup.string().required('Position is required'),
        status: Yup.string().oneOf(['interviewing', 'applied', 'selected', 'rejected'], 'Invalid status').required('Status is required'),
        dateApplied: Yup.date().required('Date applied is required'),
        note:Yup.string().optional()
    });
  