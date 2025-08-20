import * as Yup from 'yup'

export const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email Format").required("Email is Required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").matches(/[A-Z]/,"Password must contain at least one upper case",).matches(/[@#$%&?]/,"Password must contain at least one special character").required("Password is Required")
})