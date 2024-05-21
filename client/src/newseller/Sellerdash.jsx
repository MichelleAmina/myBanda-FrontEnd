import React from "react";
import NewSellerSidebar from "./sellersidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faPlus,
  faFileImport,
  faSearch,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./sellerdash.css";

const SellerDashboard = () => {
  const navigate = useNavigate(); 
  return (
    <div className="dashboard-container">
      <NewSellerSidebar />
      <div className="content-container">
        <div className="dashboard-heading">
          <div className="headercontent">
          <div className="sdsearch-bar">
          <div className="search-bar-container">
            <FontAwesomeIcon icon={faSearch} className="sdsearch-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        
            <h1>Welcome!👋</h1>
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
          <h4>We’re thrilled to have you here! </h4>
          <h2>Get ready to set up your shop</h2>
          <h4>
            Here's an introductory guide to help you get started. Let's create
            your dream store!
          </h4>
        </div>
        <div className="setup-guide-container">
          <h2>Setup guide</h2>
          <p>Use this setup guide to get your store up and running</p>
          <div className="setup-steps">
            <div className="setup-step">
              <div className="step-info">
                <div className="progress-circle progress-filled"></div>
                <div>
                  <h3>Setup your shop</h3>
                  <p>
                    Define your shop name, description, logo image, banner,
                    location, and contact details.
                  </p>
                </div>
              </div>
              <div className="button-container">
              <button className="add-product-button" onClick={() => navigate("/shopsetup")}>
              <FontAwesomeIcon icon={faPlus} />
                  Setup Shop
                </button>
              {/*  <button className="import-button button-spacing">
                  <FontAwesomeIcon icon={faFileImport} />
                  Add Product
  </button> */}
              </div>
            </div>
            <div className="setup-step">
              <div className="step-info">
                <div className="progress-circle"></div>
                <div>
                  <h3>Add your first product</h3>
                  <p>
                    Write a description, add photos, and set pricing for the
                    products you plan to sell.
                  </p>
                </div>
              </div>
            </div>
            <div className="setup-step">
              <div className="step-info">
                <div className="progress-circle"></div>
                <div>
                  <h3>Set pricing</h3>
                  <p>Manage pricing for your products.</p>
                </div>
              </div>
            </div>
            <div className="setup-step">
              <div className="step-info">
                <div className="progress-circle"></div>
                <div>
                  <h3>Manage inventory</h3>
                  <p>Track and manage your inventory.</p>
                </div>
              </div>
            </div>
            <div className="setup-step">
              <div className="step-info">
                <div className="progress-circle"></div>
                <div>
                  <h3>Optimize for search</h3>
                  <p>Improve your store's visibility in search engines.</p>
                </div>
              </div>
            </div>
            <div className="setup-step">
              <div className="step-info">
                <div className="progress-circle"></div>
                <div>
                  <h3>Monitor analytics</h3>
                  <p>
                    Analyze your store's performance with detailed analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;