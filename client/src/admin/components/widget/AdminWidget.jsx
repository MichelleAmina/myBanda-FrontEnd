import './adminWidget.scss'
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
                title: "Sellers",
                count: 100,
                link: "See all Sellers",
                icon: <StoreIcon className='icon'/>
            };
            break;
        case "Customers":
            data = {
                title: "Customers",
                count: 5000,
                link: "See all Customers",
                icon: <GroupsIcon className='icon'/>
            };
            break;
        case "Delivery Personnel":
            data = {
                title: "Delivery Providers",
                count: 100,
                link: "See all Delivery Providers",
                icon: <LocalShippingOutlinedIcon className='icon'/>
            };
            break;
        case "Admin":
            data = {
                title: "Banda Admin",
                count: 20,
                link: "See all Admin",
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