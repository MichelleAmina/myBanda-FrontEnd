import DeliveryNavbar from '../Components/DeliveryNavbar';
import DeliverySidebar from '../Components/deliverysidebar';
import './availableDeliveries.css'

const AvailableDeliveries = () => {
    return ( 
        <div className='pending-delivery'>
            <DeliverySidebar />
            <div className='pending-delivery-container'>
                <DeliveryNavbar />
            </div>

        </div>
     );
}
 
export default AvailableDeliveries;