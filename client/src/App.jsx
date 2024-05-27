import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Importing components
import Login from './shared/Login';
import DeliveryDashboard from './DeliveryPerson/Pages/DeliveryDashboard';
import CompletedDeliveries from './DeliveryPerson/Pages/CompletedDeliveries';
import DeliveryDriverAnalytics from './DeliveryPerson/Pages/DeliveryAnalytics';
import AvailableDeliveries from './DeliveryPerson/Pages/AvailableDeliveries';
import PendingDeliveries from './DeliveryPerson/Pages/PendingDeliveries';
import ViewDetails from './DeliveryPerson/Pages/ViewDetails';
import RouteCalculator from "./DeliveryPerson/Pages/map/map";

// Buyer import 
import Buyer from './buyer/Buyer';
import BuyerAbout from './buyer/pages/about/BuyerAbout';
import Listing from './buyer/pages/listing/Listing';
import ProductDetails from './buyer/components/details/ProductDetails';
import BuyersCart from './buyer/pages/carts/BuyersCart';

// import OrderProduct from './buyer/pages/order/Order';
// import CheckoutForm from './buyer/pages/order/Order'
import OrderCompleted from './buyer/pages/completed/OrderComplete';
import OrderItems from "./buyer/pages/orderItems/OrderItems";
import Vendors from './buyer/pages/vendors/Vendors';
import Wishlist from './buyer/pages/wishlist/Wishlist';
import FinalCheckout from "./buyer/pages/order/finalcheckout";

// Banda Admin
import Admin from "./admin/Admin";
import List from "./admin/pages/list/List";
import Single from "./admin/pages/single/Single";
import AdminCustomer from "./admin/pages/customer/AdminCustomer";
import AdminDelivery from "./admin/pages/delivery/AdminDelivery";

// Seller Import
import Sellerdash from "./newseller/Sellerdash";
import Custorders from "./existingseller/Custorders";
import Customers from "./existingseller/Customers";
import Sellerproducts from "./newseller/Sellerproducts";
import Newsellercustomers from "./newseller/Newsellercustomers";
import Newsellerorders from "./newseller/Newsellerorders";
import ShopSetup from "./newseller/shopsetup";
import AddProduct from "./existingseller/addproduct";
import ProductHome from "./existingseller/producthome";
import OldSellerDash from "./existingseller/oldsellerdash";
import ShopView from "./existingseller/shopview"; 
import MoreOrderDetails from './existingseller/MoreOrderDetails';




function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* buyer pages */}
        <Route path="/my_banda" element={<Buyer />}>

          <Route path="products">
            <Route index element={<Listing />}></Route>
            <Route path=":productId" element={<ProductDetails />}></Route>
          </Route>
          
          <Route path='cart' element={<BuyersCart />}></Route>
          <Route path="finalcheckout" element={<FinalCheckout />} />
          
          <Route path='orders'>
            <Route index element={<OrderCompleted />} ></Route>
            <Route path=":orderId" element={<OrderItems/>}></Route>
          </Route>

          <Route path='vendors/:sellerId' element={<Vendors />}></Route>
          <Route path='wishlist' element={<Wishlist />}></Route>
        </Route>
        




        {/*Banda Admin routes start here*/}
        <Route path="/banda_admin" element={<Admin />}>
          <Route path="customers" element={<AdminCustomer />}></Route>
          <Route path="delivery" element={<AdminDelivery />}></Route>
          <Route path="shops">
            <Route index element={<List />}></Route>
            <Route path=":sellerId" element={<Single/>}></Route>
          </Route>
        </Route>

        {/* set it to this so that I can change it once we decide on the initial landing page*/}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/driverAnalytics" element={<DeliveryDriverAnalytics />} />
        <Route path="/driverhomepage" element={<DeliveryDashboard />} />
        <Route path="/availableDeliveries" element={<AvailableDeliveries />} />
        <Route path="/completedDeliveries" element={<CompletedDeliveries />} />
        <Route path="/pendingDeliveries" element={<PendingDeliveries />} />
        <Route path="/viewDetails/:orderId" element={<ViewDetails />} />
        <Route path="/maps" element={<RouteCalculator />} />

        {/*Seller routes */}
        {/* NEW SELLER */}
        <Route path="/sellerdash" element={<Sellerdash />} />
        <Route path="/orders" element={<Custorders />} />
        <Route path="/sellerproducts" element={<Sellerproducts />} />
        <Route path="/newsellercustomers" element={<Newsellercustomers />} />
        <Route path="/newsellerorders" element={<Newsellerorders />} />
        <Route path="/shopsetup" element={<ShopSetup />} />
        
        {/* OLD SELLER */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/addprod" element={<AddProduct />} />
        <Route path="/producthome" element={<ProductHome />} />
        <Route path="/oldsellerdash" element={<OldSellerDash />} />
        <Route path="/shopview/:sellerId" element={<ShopView />} /> 
        <Route path="/moreorderdets/:orderId" element={<MoreOrderDetails />} />


      </Routes>
    </div>
  );
}

export default App;
