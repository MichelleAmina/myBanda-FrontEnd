//this page is the display of a new seller when they click the customers page
import React from 'react';
import NewSellerSidebar from "./sellersidebar"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import "./newsellercustomers.css";

const Newsellersustomers = () => {
  return (
    <div className="dashboard-container">
      <NewSellerSidebar />
      <div className="content-container">
        <div className="header">
          <h1>Customers</h1>
          <div className="header-icons">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="icon-wrapper">
            <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="icon-wrapper">
            <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </div>
        <div className="customer-info-container">
          <div className="info-box">
            <img src="src/assets/teamwork.png" alt="Customer Information" />
            <h2>All customer-related information centralized for you</h2>
            <p>Efficiently manage customer details, access order history, and monitor customer activities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsellersustomers;