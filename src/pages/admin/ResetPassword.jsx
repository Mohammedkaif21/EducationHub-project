import { useState } from "react"
import { AdminLayout } from "../../components/admin/AdminLayout"
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../../utils/api";

const ResetPassword = ()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setMessage("");
        if(password != confirmPassword){
            setError("Password does not match");
            return;
        }
        try{
            const res = await api.post(`/admin/v1/user/reset-password`, {
                token,
                newPassword: password});
            setMessage(res.data.message);
            navigate("/");
        }catch(err){
            setError(err.response?.data?.error || "Server error");

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
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="my-3">
                            <label className="text-sm">New Password</label>
                            <input type="password" placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                        </div>
                        <div className="my-3">
                            <label className="text-sm">Confirm Password</label>
                            <input type="password" placeholder="Enter password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                        </div>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 mt-3 cursor-pointer text-white font-semibold py-2 rounded-lg">Send</button>
                    </form>
                </div>    
            </div>
        </div>
    )
}
export default ResetPassword