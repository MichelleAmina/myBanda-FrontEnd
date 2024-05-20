import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import BandaLogo from "../assets/banda.png";
import dashlogo from "../assets/dashboard.png";
import {
  faShoppingBag,
  faBox,
  faUsers,
  faSignal,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./sellersidebar.css";

function NewSellerSidebar() {
  const location = useLocation();

  return (
    <div className="new-sidebar-container">
      <div className="new-sidebar-header">
        <div className="new-sidebar-logo">
          <img src={BandaLogo} alt="Banda Logo" className="new-logo-image" />
          <span className="new-logo-name">MY BANDA</span>
        </div>
      </div>
      <ul className="new-sidebar-nav">
        <li>
          <Link
            to="/sellerdash"
            className={`new-sidebar-link ${
              location.pathname === "/sellerdash" ? "active" : ""
            }`}
          >
            <img src={dashlogo} alt="dash Logo" className="new-dashlogo" />
            <span className="new-link-name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/newsellerorders"
            className={`new-sidebar-link ${
              location.pathname === "/newsellerorders" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faShoppingBag} className="new-link-icon" />
            <span className="new-link-name">Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/sellerproducts"
            className={`new-sidebar-link ${
              location.pathname === "/sellerproducts" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBox} className="new-link-icon" />
            <span className="new-link-name">Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/newsellercustomers"
            className={`new-sidebar-link ${
              location.pathname === "/newsellercustomers" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUsers} className="new-link-icon" />
            <span className="new-link-name">Customers</span>
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className={`new-sidebar-link ${
              location.pathname === "/analytics" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faSignal} className="new-link-icon" />
            <span className="new-link-name">Analytics</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={`new-sidebar-link ${
              location.pathname === "/settings" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCog} className="new-link-icon" />
            <span className="new-link-name">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NewSellerSidebar;
