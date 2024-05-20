import './adminWidget.scss'
import { NavLink } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
import StoreIcon from '@mui/icons-material/Store'

function AdminWidget({ role, count }) {
    let data;

    const roleMapping = {
        seller: {
            title: "Shops",
            link: '/banda_admin/shops',
            icon: <StoreIcon className='icon' />
        },
        customer: {
            title: "Customers",
            link: '/banda_admin/customers',
            icon: <GroupsIcon className='icon' />
        },
        delivery: {
            title: "Delivery Providers",
            link: '/banda_admin/delivery',
            icon: <LocalShippingOutlinedIcon className='icon' />
        },
        admin: {
            title: "Banda Admin",
            link: '',
            icon: <PersonOutlineIcon className='icon' />
        }
    };

    if (roleMapping[role]) {
        data = roleMapping[role];
    } else {
        data = {
            title: "Unknown",
            link: '',
            icon: null
        };
    }

    return (
        <div className='adminWidget'>
            <div className="admin-left">
                <span className='admin-title'>{data.title}</span>
                <span className='admin-counter'>{count}</span>
                <span className='admin-link'>
                    <NavLink to={data.link} style={{ textDecoration: "none", color: "#000" }}>
                        See All {data.title}
                    </NavLink>
                </span>
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

/*import './adminWidget.scss'
import {NavLink} from 'react-router-dom'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';

function AdminWidget({type, users}){
    console.log("from widget", users)
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

*/