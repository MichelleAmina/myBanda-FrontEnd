import './adminWidget.scss'
import {NavLink} from 'react-router-dom'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';

function AdminWidget({type}){
    let data;
    
    switch (type) {
        case "Seller":
            data = {
                title: "Shops",
                count: 100,
                link: <NavLink to='/banda_admin/shops' style={{textDecoration:"none", color:"#000"}}>See All Shops</NavLink>,
                icon: <StoreIcon className='icon'/>
            };
            break;
        case "Customers":
            data = {
                title: "Customers",
                count: 5000,
                link: <NavLink to='/banda_admin/customers' style={{textDecoration:"none", color:"#000"}}>See All Customers</NavLink>,
                icon: <GroupsIcon className='icon'/>
            };
            break;
        case "Delivery Personnel":
            data = {
                title: "Delivery Providers",
                count: 100,
                link: <NavLink to='/banda_admin/delivery' style={{textDecoration:"none",color:'#000'}} >See All Delivery Providers</NavLink>,
                icon: <LocalShippingOutlinedIcon className='icon'/>
            };
            break;
        case "Admin":
            data = {
                title: "Banda Admin",
                count: 20,
                link: <NavLink to=''style={{textDecoration:"none",color:'#000'}} >See All Admin</NavLink>,
                icon: <PersonOutlineIcon className='icon'/>
            };
            break;
        default:
            // Handle unknown type
            data = {};
            break;
    }
    return(
        <div className='adminWidget'>
            <div className="admin-left">
                <span className='admin-title'>{data.title}</span>
                <span className='admin-counter'>{data.count}</span>
                <span className='admin-link'>{data.link}</span>
            </div>
            <div className="admin-right">
                <div className="admin-icons">
                {data.icon}
                </div>
                
            </div>
        </div>
    )
}

export default AdminWidget