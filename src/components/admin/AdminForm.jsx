import { useState } from "react";
import { Link, useNavigate } from "react-router"
import api from "../../utils/api";
import { toast } from "react-toastify";
import { ValidationSchema } from "../../validations/validation";
import ReCAPTCHA from "react-google-recaptcha";

const AdminForm = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [captcha,setcaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        if(!captcha){
            alert('Please complete the recaptcha'); 
            return;
        }
        try{
            await ValidationSchema.validate(
                { email,password },
                { abortEarly: false }
            )
            console.log({
                email,
                password,
                captcha
            });
            
            const res = await api.post('/admin/v1/admin/login',{ email,password,captcha });
            localStorage.setItem("accessToken",res.data.accessToken);
            console.log("Login Successfully",res.data);
            toast.success("Login Successfully")
            navigate("/admin/dashboard");
            
        }catch(err){
            if (err.name === "ValidationError") {
                setError(err.errors.join(" | "))
            }else if(err.response && err.response.data){
                setError(err.response.data.message);
                console.log(err);
            }else{
                setError("An error occurred. Please try again.");
                console.log(err);
                
            }
        }
    };

    return (
        <div className="width-full h-screen flex items-center justify-center bg-gray-100">
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-start mb-4">
                    <img src="/assets/Clip-group.svg" alt="logo" className="" />
                    <h1 className="flex items-center justify-center text-lg ms-2 font-bold">Education Hub</h1>
                </div>
                <h2 className="text-gray-500 text-sm">Welcome Back</h2>
                <h1 className="text-2xl font-bold mb-6">Log In to your Account</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="mb-4" onSubmit={handleSubmit}>
                    <div className="my-2">
                        <label className="text-sm">Email Address</label>
                        <input type="email" placeholder="Enter your email address" onChange={(e)=>{
                            setEmail(e.target.value);
                            setError("");
                        }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                    </div>
                    <div className="my-3">
                        <label className="text-sm">Password</label>
                        <input type="password" placeholder="Enter password" onChange={(e)=>{
                            setPassword(e.target.value)
                            setError("")
                        }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                    </div>
                    <div className="flex justify-between text-xs mt-4 mb-5">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4"/>
                            Remember Me
                        </label>
                        <Link to="/forget-password" className="text-blue-600 hover:underline">Forget Password?</Link>
                    </div>
                    <div className="w-full justify-center">
                    <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={(token)=>setcaptchaToken(token)}  />
                    </div>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-2 rounded-lg">Login</button>
                </form>

            </div>
        </div>
    )
}
export default AdminForm