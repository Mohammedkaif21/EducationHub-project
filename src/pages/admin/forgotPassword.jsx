import { AdminLayout } from "../../components/admin/AdminLayout"
import { Link, useNavigate } from "react-router";
import api from "../../utils/api";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("")
        setError("");
        if (!captchaToken) {
            setMessage("Please verify the captcha");
            return;
        }
        try {
            const res = await api.post('/admin/v1/user/forgot-password', {
                email,
                captcha: captchaToken
            })
            setMessage(res.data.message);
            toast.success("Reset link send to your email")
        } catch (err) {
            setError(err.response?.data?.error || "Server error");
        }
    }
    return (
        <div>
            <AdminLayout />
            <div className="width-full h-screen flex items-center justify-center bg-gray-100">
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
                    <div className="flex items-center justify-start mb-4">
                        <img src="/assets/Clip-group.svg" alt="logo" />
                        <h1 className="flex items-center justify-center text-lg ms-2 font-bold">Education Hub</h1>
                    </div>
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <h2 className="text-gray-500 text-sm mt-1">Enter your Email Address associated with you account</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mt-4 mb-2">
                            <label className="text-sm">Email Address</label>
                            <input type="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                        </div>
                        <div className="mt-6 mb-2">
                            <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={(token) => setCaptchaToken(token)} />
                        </div>
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 mt-3 cursor-pointer text-white font-semibold py-2 rounded-lg">Send</button>
                        <button onClick={() => navigate("/")} className="m-auto text-sm text-blue-500 hover:underline mt-2 block cursor-pointer">Go to Login</button>

                    </form>
                </div>


            </div>
        </div>
    )
}
export default ForgotPassword;