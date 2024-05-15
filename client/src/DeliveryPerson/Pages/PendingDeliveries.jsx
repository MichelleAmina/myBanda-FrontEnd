import DeliveryNavbar from "../Components/DeliveryNavbar";
import DeliverySidebar from "../Components/deliverysidebar";
import PendDeliveriesTable from "../Components/PendDeliveiresTable";
import './pendingDeliveries.css'

const   PendingDeliveries = () => {
    return ( 
        <div className="pending-deliveries">
            <DeliverySidebar />
            <div className="pending-deliveries-container">
                <DeliveryNavbar />
                <PendDeliveriesTable />
            </div>
        </div>
     );
}
 
export default PendingDeliveries;