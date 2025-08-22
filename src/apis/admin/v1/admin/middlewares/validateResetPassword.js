const resetPasswordSchema = require("../validator/resetPasswordValidation")

const validateResetPassword = (req,res,next) =>{
    const { error } = resetPasswordSchema.validate(req.body, { abortEarly: false });

    if(error){
        return res.status(400).json({
            success: false,
            errors: error.details.map(err=>err.message)
        })
    }
    next();
} 
module.exports = validateResetPassword;