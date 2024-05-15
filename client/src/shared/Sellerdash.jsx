//THIS DASHBOARD IS FOR A NEW SELLER

import React from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "../sellerdash.css";

const SellerDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="dashboard-heading">
          <h1>Dashboard</h1>
          <div className="header-icons">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
          <h4>Welcome, we’re thrilled to have you here!</h4>
          <h2>Get ready to sell</h2>
          <h4>
            Here's an introductory guide. As your business expands, you'll
            receive updated advice and insights here.
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
                  <h3>Add your first product</h3>
                  <p>
                    Write a description, add photos, and set pricing for the
                    products you plan to sell.
                  </p>
                </div>
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
