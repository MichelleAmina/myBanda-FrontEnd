import './completedDeliveries.css'
import DeliverySidebar from '../Components/deliverysidebar';
import DeliveryNavbar from '../Components/DeliveryNavbar';
import CompDeliveriesTable from '../Components/CompDeliveryTable';

const CompletedDeliveries = () => {
    return ( 
        <div className="completed-deliveries">
            <DeliverySidebar />
            <div className="completed-deliveries-container">
                <DeliveryNavbar />
                <div className="pending-title">Completed Deliveries</div>
                {/* <p>Here are the deliveries you have completed recently.</p> */}
                <CompDeliveriesTable />
            </div>
        </div>
     );
}
 
export default CompletedDeliveries;