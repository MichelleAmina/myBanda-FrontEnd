import './widgets.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WalletIcon from '@mui/icons-material/Wallet';
import PaidIcon from '@mui/icons-material/Paid';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';

const Widget = ({type}) => {
    let data;

    // temporary
    const amount = 100
    const diff = 20

    switch (type) {
        case "Available deliveries":
            data = {
                title: "Available deliveries",
                isMoney: false,
                link: "See all pending",
                path: '/driverhomepage',
                icon: <PendingActionsIcon 
                    className='icon' 
                    style={{color: "crimson"}}
                    />,
            };
            break;
        case "Completed deliveries":
            data = {
                title: "Completed deliveries",
                isMoney: false,
                link: "View completed deliveries",
                path: "/completedDeliveries",
                icon: <TaskIcon 
                className='icon' 
                style={{color: "orange"}}
                />,
            };
            break;
        case "Earnings":
            data = {
                title: "Earnings",
                isMoney: true,
                link: "View net earnings",
                path: "",
                icon: <PaidIcon 
                className='icon' 
                style={{color: "green"}}
                />,
            };
            break;
        case "Pending deliveries":
            data = {
                title: "Pending deliveries",
                isMoney: false,
                link: "View pending deliveries",
                path: "/pendingDeliveries",
                icon: <PendingActionsIcon 
                className='icon' 
                style={{color: "purple"}}
                />,
            };
            break;
            case "Wallet":
            data = {
                title: "Wallet",
                isMoney: true,
                link: "View details",
                path: "",
                icon: <WalletIcon 
                className='icon' 
                style={{color: "purple"}}
                />,
            };
            break;
        default:
            break;
    }
    return ( 
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="count">{data.isMoney && '$'} {amount}</span>
                <Link to={data.path} className="widget-link">{data.link}</Link>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
     );
}
 
export default Widget;