const Joi = require("joi");

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email":"Please provide a valid email",
        "string.empty":"Email is required",
        "any.required":"Email is required"
    }),
    captcha: Joi.string().required().messages({
        "string.empty": "Captcha is required",
        "any.required": "Captcha is required"
    })
})
module.exports = forgotPasswordSchema;