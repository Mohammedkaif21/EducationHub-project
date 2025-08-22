import { useState } from "react"
import { AdminLayout } from "../../components/admin/AdminLayout"
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../../utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import { ResetValidationSchema } from "../../validations/validation";

const ResetPassword = ()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");
    const [captchaToken,setCaptchaToken] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setMessage("");
        
        try{
            await ResetValidationSchema.validate({
                newPassword: password, confirmPassword, captchaToken },
                { abortEarly: false }
            );
            const res = await api.post(`/admin/v1/user/reset-password`, {
                token,
                newPassword: password,
                confirmPassword: confirmPassword,
                captcha: captchaToken
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            setMessage(res.data.message);
            setPassword("");
            setConfirmPassword("");
            setCaptchaToken("");
            toast.success("Password reset successfully")
            navigate("/");
        }catch(err){
            if (err.name === "ValidationError") {
                const formErrors = {};
                err.inner.forEach((e) => {
                    formErrors[e.path] = e.message
                })
            setError(formErrors)
            } else {
                setError({ general: err.response?.data?.errors || "something went wrong" })
            }
        }
        
    }
    return(
        <div>
            <AdminLayout/>
            <div className="width-full h-screen flex items-center justify-center bg-gray-100">
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
                    <div className="flex items-center justify-start mb-4">
                        <img src="/assets/Clip-group.svg" alt="logo" />
                        <h1 className="flex items-center justify-center text-lg ms-2 font-bold">Education Hub</h1>
                    </div>
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <h2 className="text-gray-500 text-sm mt-1">Enter new Password</h2>
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="my-3 relative">
                            <label className="text-sm">New Password</label>
                            <input type={showPassword ? "text" :"password"} placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                            <div className="absolute right-2 top-8   cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword ?<LuEye size={22}/> : <LuEyeOff size={22}/> }
                            </div>
                        </div>
                            {error.newPassword && <p className="text-red-500  rounded-lg  bg-red-200 p-2 mt-1 mb-4">{error.newPassword}</p>}
                        <div className="my-3 relative">
                            <label className="text-sm">Confirm Password</label>
                            <input type={showConfirm ? "text" : "password"} placeholder="Enter password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                            <div className="absolute right-2 top-8 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? <LuEye size={22} /> : <LuEyeOff size={22} />}
                            </div>
                        </div>
                        {error.confirmPassword && <p className="text-red-500  rounded-lg  bg-red-200 p-2 mt-1 mb-4">{error.confirmPassword}</p>}
                        {error.captcha &&
                            <p className="text-red-500 rounded-lg  bg-red-200 p-3 text-md">{error.captcha}</p>}
                        <div className="mt-2 mb-2">
                            <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={(token)=>setCaptchaToken(token)} />
                        </div>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 mt-3 cursor-pointer text-white font-semibold py-2 rounded-lg">Send</button>
                    </form>
                </div>    
            </div>
        </div>
    )
}
export default ResetPassword