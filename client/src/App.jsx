import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Route, Routes, Navigate } from "react-router-dom";
import Login from './shared/Login';
import DeliveryDashboard from './DeliveryPerson/Pages/DeliveryDashboard';
import CompletedDeliveries from './DeliveryPerson/Pages/CompletedDeliveries';
import DeliveryDriverAnalytics from './DeliveryPerson/Pages/DeliveryAnalytics';
import AvailableDeliveries from './DeliveryPerson/Pages/AvailableDeliveries';
import PendingDeliveries from './DeliveryPerson/Pages/PendingDeliveries';
import ViewDetails from './DeliveryPerson/Pages/ViewDetails';
// Buyer import 
import Buyer from './buyer/Buyer';
import BuyerAbout from './buyer/pages/about/BuyerAbout';
import Listing from './buyer/pages/listing/Listing';
import ProductDetails from './buyer/components/details/ProductDetails';
import BuyersCart from './buyer/pages/carts/BuyersCart';
import OrderProduct from './buyer/pages/order/Order';
// Banda Admin
import Admin from './admin/Admin';
import List from './admin/pages/list/List'
import Single from './admin/pages/single/Single'

// Seller Import 
import Sellerdash from "./shared/Sellerdash";
import Custorders from "./shared/Custorders";
import Customers from "./shared/Customers";
import Sellerproducts from "./shared/Sellerproducts";
import Newsellercustomers  from "./shared/Newsellercustomers";
import Newsellerorders from "./shared/Newsellerorders";




function App() {


  return (
    //<Route path="products/:productId" element={<ProductDetails />} />
    // Please add your routes and nested routes to this page. 
    // If there's any problem, reach out and i'll do the routing 
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        {/* buyer pages */}
        <Route path='/my_banda' element={<Buyer/>}>
        <Route path='products'>
          <Route index element={<Listing/>}></Route>
          <Route path=':productId' element={<ProductDetails/>}></Route>
        </Route>

        <Route path='cart' element={<BuyersCart />}></Route>
        <Route path='checkout' element={<OrderProduct />}></Route>
          
          <Route path='products'>
            <Route index element={<Listing/>}></Route>
            <Route path=':productId' element={<ProductDetails/>}></Route>
          </Route>
          <Route path='about' element={<BuyerAbout/>}></Route>
        </Route>

        
        {/*Banda Admin routes start here*/}
        <Route path='/banda_admin' element={<Admin/>}>
          <Route path='customers'></Route>
          <Route path='delivery'></Route>
          <Route path='shops'>
            <Route index element={<List/>}></Route>
            <Route path=':sellerId' element={<Single/>}></Route>
          </Route>

        </Route>
      
        {/* set it to this so that i can code change it once we decide on the initial landing page*/}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/driverhomepage' element={<DeliveryDashboard/>} />
        <Route path='/availableDeliveries' element={<AvailableDeliveries />} />
        <Route path="/completedDeliveries" element={<CompletedDeliveries />} />
        <Route path="/driverAnalytics" element={<DeliveryDriverAnalytics />} />
        <Route path='/pendingDeliveries' element={<PendingDeliveries />} />
        <Route path='/viewDetails/:orderId' element={<ViewDetails />} />

        

        {/*Seller routes */}
        <Route path="/sellerdash" element={<Sellerdash />} />
        <Route path="/orders" element={<Custorders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sellerproducts" element={<Sellerproducts />} />
        <Route path="/newsellercustomers" element={<Newsellercustomers />} />
        <Route path="/newsellerorders" element={<Newsellerorders />} />
      </Routes>
    </div>
  )
}

export default App
