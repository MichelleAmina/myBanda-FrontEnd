//(new seller-product page) - this file displays an add but upload button for a new seller

import React from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSearch, faPlus, faFileImport, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import "../sellerproducts.css";

const SellerProducts = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="dashboard-heading">
          <div className="header-icons">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
          <h1>Products</h1>
          <h4>Welcome, we’re thrilled to have you here!</h4>
        </div>
        <div className="setup-guide-container">

          <div className="white-container">
            <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon"  />
              <input type="text" placeholder="Search products..." />
            </div>
            <div className="divider"></div>
            <div className="add-products">
            <div className="subheading">
            <h2>Add your products</h2>
          </div>
              <div className="button-container">

                <button className="add-product-button">
                  <FontAwesomeIcon icon={faPlus} />
                  Add Product
                </button>
                <button className="import-button button-spacing">
                  <FontAwesomeIcon icon={faFileImport} />
                  Import
                </button>
              </div>
            </div>
            <div className="divider"></div>
            <div className="tip">
              <div className="tip-heading">
                <FontAwesomeIcon icon={faLightbulb} className="lightbulb-icon" color="#FFBF00" />
                <h2>Tip</h2>
              </div>
              <h3>Boost efficiency: Upload files to swiftly stock your store with customer favorites.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
