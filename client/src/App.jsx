import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Route, Routes, Navigate } from "react-router-dom";
import Login from './shared/Login';

function App() {


  return (
    // Please add your routes and nested routes to this page. 
    // If there's any problem, reach out and i'll do the routing 
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        {/* set it to this so that i can code change it once we decide on the initial landing page*/}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
