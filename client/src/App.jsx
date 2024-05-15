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

function App() {


  return (
    // Please add your routes and nested routes to this page. 
    // If there's any problem, reach out and i'll do the routing 
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        {/* set it to this so that i can code change it once we decide on the initial landing page*/}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/driverhomepage' element={<DeliveryDashboard/>} />
        <Route path='/availableDeliveries' element={<AvailableDeliveries />} />
        <Route path="/completedDeliveries" element={<CompletedDeliveries />} />
        <Route path="/driverAnalytics" element={<DeliveryDriverAnalytics />} />
        <Route path='/pendingDeliveries' element={<PendingDeliveries />} />
        <Route path='/viewDetails/:id' element={<ViewDetails />} />
      </Routes>
    </div>
  )
}

export default App
