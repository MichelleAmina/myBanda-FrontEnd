import './adminSidebar.scss'
import {NavLink, useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InboxIcon from '@mui/icons-material/Inbox';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function AdminSidebar(){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        console.log("user logged out")
        // Optionally, remove other user-specific data
        // localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('cart');
        navigate('/login'); 
    };

    return(
        <div className='adminSidebar'>
            <div className="top">
                <NavLink to='/banda_admin'><span className='logo'><HomeIcon/>My Banda</span></NavLink>
            </div>
            <hr />

            <div className="center">
                <ul>
                    <li><DashboardIcon/><NavLink to='/banda_admin' style={{textDecoration:"none"}}><span>Dashboard</span></NavLink></li>
                    <p className="title">Pages</p>
                    <li><StoreIcon/><NavLink to='/banda_admin/shops' style={{textDecoration:"none"}}><span>Shops</span></NavLink></li>
                    <li><GroupsIcon/><NavLink to='/banda_admin/customers' style={{textDecoration:"none"}}><span>Customers</span></NavLink></li>
                    <li><LocalShippingOutlinedIcon/><NavLink to='/banda_admin/delivery' style={{textDecoration:"none"}}><span>Delivery</span></NavLink></li>
                    <p className="title">Apps</p>
                    <li><CalendarMonthIcon/><span>Calender</span></li>
                    <li><InboxIcon/><span>Chats</span></li>
                    {/*<p className="title">Stats</p>
                    <li><InsertChartIcon/><span>Analytics</span></li>*/}
                    <p className="title">User</p>
                    <li><AccountCircleIcon/><span>Profile</span></li>
                    <li onClick={handleLogout}><LogoutIcon/><span>Logout</span></li>
                </ul>
            </div>


            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
                
            </div>
        </div>
    )
}

export default AdminSidebar