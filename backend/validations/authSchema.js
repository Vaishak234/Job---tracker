
import Joi from 'joi';

const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

export const userSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegx).required()
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegx).required()
});