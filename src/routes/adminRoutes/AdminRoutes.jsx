import { BrowserRouter,Routes,Route } from 'react-router'
import AdminLogin from '../../pages/admin/AdminLogin';
import Dashboard from '../../pages/admin/dashboard';

const AdminRoutes =()=>{

    return (
        <div className=''>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/login' element={<AdminLogin />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AdminRoutes;