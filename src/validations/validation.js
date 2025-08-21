import * as Yup from 'yup'

export const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid Email Format")
        .required("Email is Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one upper case",)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain at least one special character")
        .required("Password is Required")
})
export const ResetValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
    .required()
    .min(8)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one upper case, one lower case, one digit and one special character"
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")],"Password must match")   
    .required("Confirm password is required"),
    captcha: Yup.string().required("Captcha verification is required")
    
})