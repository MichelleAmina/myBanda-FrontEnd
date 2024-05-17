import React, { useState } from "react";
import './deliveryDashboard.css';
import DeliverySidebar from "../Components/deliverysidebar";
import DeliveryNavbar from "../Components/DeliveryNavbar";
// import Featured from "../Components/Featured";
import AvailableOrders from "../Components/PendingOrdersTable";
import SearchIcon from '@mui/icons-material/Search';
// import React, { useState } from "react";

const DeliveryDashboard = () => {
    // const [search, setSearch] = useState('')


    return ( 
        <div className="driver-dashboard">
            < DeliverySidebar />
            <div className="driver-dashboard-container">
                <DeliveryNavbar />
                {/* <div className="dash-feature">
                        <Featured />
                </div> */}
                {/* <div className="deivery-searchbar">
                    <SearchIcon />
                    <input 
                        type="text" 
                        placeholder="Search for orders" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div> */}
                <div className="available-orders-container">
                    <div className="pending-title">Available Deliveries</div>
                    <h3>Welcome Back,</h3>
                    <p>Here are all the orders ready for you to pickup and deliver.</p>
                    <AvailableOrders />
                </div>
            </div>
        </div>
     );
}
 
export default DeliveryDashboard;