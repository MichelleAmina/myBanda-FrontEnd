import './adminSidebar.scss'
import {NavLink} from 'react-router-dom'

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
    return(
        <div className='adminSidebar'>
            <div className="top">
                <NavLink to='/banda_admin'><span className='logo'><HomeIcon/>My Banda</span></NavLink>
            </div>
            <hr />

            <div className="center">
                <ul>
                    <li><DashboardIcon/><span>Dashboard</span></li>
                    <p className="title">Pages</p>
                    <li><StoreIcon/><span>Sellers</span></li>
                    <li><GroupsIcon/><span>Customers</span></li>
                    <li><LocalShippingOutlinedIcon/><span>Delivery</span></li>
                    <p className="title">Apps</p>
                    <li><CalendarMonthIcon/><span>Calender</span></li>
                    <li><InboxIcon/><span>Chats</span></li>
                    <p className="title">Stats</p>
                    <li><InsertChartIcon/><span>Analytics</span></li>
                    <p className="title">User</p>
                    <li><AccountCircleIcon/><span>Profile</span></li>
                    <li><LogoutIcon/><span>Logout</span></li>
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