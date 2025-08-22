import * as Yup from 'yup'

export const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid Email Format")
        .required("Email is Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one upper case",)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain at least one capital or special character")
        .required("Password is Required"),
    captcha: Yup.string()
    .typeError("Captcha verification is required")
    .required("Captcha verification is required")
})
export const ResetValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
    .min(8)
    .matches(
        /[A-Z]/,
        "Password must contain at least one uppercase letter"
    )
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character")
    .required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")],"Password must match")
    .required("Confirm password is required"),
    captcha: Yup.string().required("Captcha verification is required")
    
})