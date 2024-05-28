import DeliveryNavbar from "../Components/DeliveryNavbar";
import DeliverySidebar from "../Components/deliverysidebar";
import ViewDetailsPage from "../Components/ViewDetailsPage";
import './view.css'

const ViewDetails = () => {
    return ( 
        <div className="order-details">
            <DeliverySidebar />
            <div className="order-details-container">
                {/* <DeliveryNavbar /> */}
                <div className="order-dets">
                    <ViewDetailsPage />
                </div>
            </div>
        </div>
     );
}
 
export default ViewDetails;