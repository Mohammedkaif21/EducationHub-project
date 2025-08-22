import LoginForm from "../../components/admin/AdminForm";
import { AdminLayout } from "../../components/admin/AdminLayout";


const AdminLogin = ({children}) => {

    return (
       <div>
        <AdminLayout/>
        <LoginForm />
       </div>
    )
}
export default AdminLogin;