const Joi = require('joi');

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    newPassword:Joi.string()
    .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
    .required()
    .messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password cannot exceed 30 characters",
        "string.pattern.base":
            "Password must include uppercase, lowercase, number, and special character"
    }),
    confirmPassword: Joi.any()
    .equal(Joi.ref("newPassword"))
    .required()
    .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm Password cannot be empty"
    })
}).unknown(true)
module.exports = resetPasswordSchema