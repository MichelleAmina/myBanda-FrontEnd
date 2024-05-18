import './admin.scss'
import { Outlet, useLocation } from "react-router-dom"
import AdminHome from "./pages/home/AdminHome";
import AdminSidebar from "./components/adminSidebar/AdminSidebar";
import AdminNav from './components/navbar/AdminNav'
import './style/dark.scss'


function Admin(){
    const location = useLocation()

    const renderHomePage = location.pathname === '/banda_admin';

    return(
        <div className="Home">
            <AdminSidebar/>  
               
            <div className="HomeContainer">
                <AdminNav/>  
                {renderHomePage && <AdminHome/>}

                <Outlet/>
            
        
            </div>    
        </div>
        
    )
}

export default Admin