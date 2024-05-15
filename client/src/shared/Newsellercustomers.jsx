//this page is the display of a new seller when they click the customers page
import React from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../newsellercustomers.css";

const Newsellersustomers = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="header">
          <h1>Customers</h1>
          <div className="header-icons">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
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
