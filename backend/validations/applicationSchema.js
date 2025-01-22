
import Joi from 'joi'

export const applicationSchema = Joi.object({
    company: Joi.string().optional().messages({
        'string.empty': 'Company name cannot be empty'
    }),
    position: Joi.string().optional().messages({
        'string.empty': 'Position cannot be empty'
    }),
    dateApplied: Joi.date().optional().messages({
        'date.base': 'Date applied must be a valid date'
    }),
    status: Joi.string().valid('applied', 'interviewing', 'selected', 'rejected').optional().messages({
        'any.only': 'Status must be one of applied, interviewing, selected, rejected'
    }),
    note: Joi.string().optional().allow('')
});
