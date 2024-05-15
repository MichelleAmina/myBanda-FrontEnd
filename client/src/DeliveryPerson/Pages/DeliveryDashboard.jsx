import React from "react";
import './deliveryDashboard.css';
import DeliverySidebar from "../Components/deliverysidebar";
import DeliveryNavbar from "../Components/DeliveryNavbar";
import Featured from "../Components/Featured";
import AvailableOrders from "../Components/PendingOrdersTable";

const DeliveryDashboard = () => {
    return ( 
        <div className="driver-dashboard">
            < DeliverySidebar />
            <div className="driver-dashboard-container">
                <DeliveryNavbar />
                <div className="dash-feature">
                        <Featured />
                </div>
                <div className="pending-orders-container">
                    <div className="pending-title">Available Deliveries</div>
                    <AvailableOrders />
                </div>
            </div>
        </div>
     );
}
 
export default DeliveryDashboard;