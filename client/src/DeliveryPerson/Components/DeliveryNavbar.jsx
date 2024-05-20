import "./deliveryNavbar.css"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

const DeliveryNavbar = () => {
    return ( 
        <div className="delivery-navbar">
            <div className="delivery-wrapper">
                <div className="delivery-search">
                    <input type="text" placeholder="Search..." className="delivery-search-input"/>
                    <SearchIcon />
                </div>
                <div className="delivery-navbar-items">
        
                    <div className="delivery-navbar-item">
                        <LanguageIcon />
                        English
                    </div>
                    <div className="delivery-navbar-item">
                        <NotificationsIcon />
                        <div className="delivery-notif-counter">1</div>
                    </div>
                    <div className="delivery-navbar-item">
                        <PersonIcon />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DeliveryNavbar;