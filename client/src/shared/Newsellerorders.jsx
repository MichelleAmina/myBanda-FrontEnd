//this page is the display of a new seller when they click the orders page
import React from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../newsellerorders.css";

const Newsellerorders = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="header">
          <h1>Orders</h1>
          <div className="header-icons">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="customer-info-container">
          <div className="info-box">
            <img src="src/assets/order.png" alt="Order Information" />
            <h2>All order-related information centralized for you</h2>
            <p>
              Efficiently manage orders, track shipments, and handle customer
              requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsellerorders;
