import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faBox,
  faUsers,
  faSignal,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import BandaLogo from "../assets/banda.png";
import dashlogo from "../assets/dashboard.png";
import "./oldside.css";

function OldSidebar() {
  const location = useLocation();

  return (
    <div className="old-sidebar-container">
      <div className="old-sidebar-header">
        <div className="old-sidebar-logo">
          <img src={BandaLogo} alt="Banda Logo" className="old-logo-image" />
          <span className="old-logo-name">MY BANDA</span>
        </div>
      </div>
      <ul className="old-sidebar-nav">
        <li>
          <Link
            to="/oldsellerdash"
            className={`old-sidebar-link ${
              location.pathname === "/oldsellerdash" ? "active" : ""
            }`}
          >
            <img src={dashlogo} alt="dash Logo" className="old-dashlogo" />
            <span className="old-link-name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className={`old-sidebar-link ${
              location.pathname === "/orders" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faShoppingBag} className="old-link-icon" />
            <span className="old-link-name">Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/producthome"
            className={`old-sidebar-link ${
              location.pathname === "/producthome" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBox} className="old-link-icon" />
            <span className="old-link-name">Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/customers"
            className={`old-sidebar-link ${
              location.pathname === "/customers" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUsers} className="old-link-icon" />
            <span className="old-link-name">Customers</span>
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className={`old-sidebar-link ${
              location.pathname === "/analytics" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faSignal} className="old-link-icon" />
            <span className="old-link-name">Analytics</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={`old-sidebar-link ${
              location.pathname === "/settings" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCog} className="old-link-icon" />
            <span className="old-link-name">Settings</span>
          </Link>
        </li>
        <li>
        <Link
          to="/shopview/defaultSellerId" 
          className={`old-sidebar-link ${
            location.pathname === "/shopview/defaultSellerId" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faHome} className="old-link-icon" />
          <span className="old-link-name">Shop</span>
        </Link>
      </li>      
      </ul>
    </div>
  );
}

export default OldSidebar;
