import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./shared/Login";
import Sellerdash from "./shared/Sellerdash";
import Custorders from "./shared/Custorders";
import Customers from "./shared/Customers";
import Sellerproducts from "./shared/Sellerproducts";
import Newsellercustomers  from "./shared/Newsellercustomers";
import Newsellerorders from "./shared/Newsellerorders";

function App() {
  return (
    // Please add your routes and nested routes to this page.
    // If there's any problem, reach out and I'll do the routing
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* set it to this so that i can code change it once we decide on the initial landing page*/}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/sellerdash" element={<Sellerdash />} />
        <Route path="/orders" element={<Custorders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sellerproducts" element={<Sellerproducts />} />
        <Route path="/newsellercustomers" element={<Newsellercustomers />} />
        <Route path="/newsellerorders" element={<Newsellerorders />} />


      </Routes>
    </div>
  );
}

export default App;
