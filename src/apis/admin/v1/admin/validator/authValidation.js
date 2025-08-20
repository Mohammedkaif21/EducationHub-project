const Joi = require('joi');

exports.LoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please Enter Valid Email',
        'string.empty': 'Email is Required',
        'any.required': 'Email is Required'
    }),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=^[a-zA-Z0-9@#$%&]{6,}$).*$/))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one special character',
            'string.empty': 'Password is required',
            'string.min': 'Password must at least 8 Characters',
            'any.required': 'Password is required'
    }),
    captcha: Joi.string().required().messages({
        'string.empty':'Captcha is required',
        'any.required':'Captcha is required'
    })
})