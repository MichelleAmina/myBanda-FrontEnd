import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.css';

import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./shared/Login";
import DeliveryDashboard from "./DeliveryPerson/Pages/DeliveryDashboard";
import CompletedDeliveries from "./DeliveryPerson/Pages/CompletedDeliveries";
import DeliveryDriverAnalytics from "./DeliveryPerson/Pages/DeliveryAnalytics";
import AvailableDeliveries from "./DeliveryPerson/Pages/AvailableDeliveries";
import PendingDeliveries from "./DeliveryPerson/Pages/PendingDeliveries";
import ViewDetails from "./DeliveryPerson/Pages/ViewDetails";
// Buyer import
import Buyer from "./buyer/Buyer";
import BuyerAbout from "./buyer/pages/about/BuyerAbout";
import Listing from "./buyer/pages/listing/Listing";
import ProductDetails from "./buyer/components/details/ProductDetails";
// Banda Admin
import Admin from "./admin/Admin";
import List from "./admin/pages/list/List";
import Single from "./admin/pages/single/Single";

// Seller Import
import Sellerdash from "./newseller/Sellerdash";
import Custorders from "./existingseller/Custorders";
import Customers from "./existingseller/Customers";
import Sellerproducts from "./newseller/Sellerproducts";
import Newsellercustomers from "./newseller/Newsellercustomers";
import Newsellerorders from "./newseller/Newsellerorders";
import ShopSetup from "./newseller/shopsetup";
import AddProduct from "./newseller/addproduct"; // Corrected import statement
import ProductHome from "./newseller/producthome"; // Import ProductHome

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/my_banda" element={<Buyer />}>
          <Route path="products">
            <Route index element={<Listing />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="about" element={<BuyerAbout />} />
        </Route>
        <Route path="/banda_admin" element={<Admin />}>
          <Route path="customers" />
          <Route path="delivery" />
          <Route path="vendors">
            <Route index element={<List />} />
            <Route path=":sellerId" element={<Single />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/driverhomepage" element={<DeliveryDashboard />} />
        <Route path="/availableDeliveries" element={<AvailableDeliveries />} />
        <Route path="/completedDeliveries" element={<CompletedDeliveries />} />
        <Route path="/driverAnalytics" element={<DeliveryDriverAnalytics />} />
        <Route path="/pendingDeliveries" element={<PendingDeliveries />} />
        <Route path="/viewDetails/:id" element={<ViewDetails />} />
        <Route path="/sellerdash" element={<Sellerdash />} />
        <Route path="/orders" element={<Custorders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sellerproducts" element={<Sellerproducts />} />
        <Route path="/newsellercustomers" element={<Newsellercustomers />} />
        <Route path="/newsellerorders" element={<Newsellerorders />} />
        <Route path="/shopsetup" element={<ShopSetup />} />
        <Route path="/addprod" element={<AddProduct />} />
        <Route path="/producthome" element={<ProductHome />} />
      </Routes>
    </div>
  );
}

export default App;
