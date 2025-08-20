import { BrowserRouter, Routes, Route } from 'react-router'
import AdminLogin from '../../pages/admin/AdminLogin';
import ForgotPassword from '../../pages/admin/forgotPassword';
import ResetPassword from '../../pages/admin/ResetPassword';

const AdminRoutes = () => {

    return (
        <div className=''>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AdminLogin />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AdminRoutes;