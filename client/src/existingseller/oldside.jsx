import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";

import {
  faHome,
  faShoppingBag,
  faBox,
  faUsers,
  faSignal,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./oldside.css";

function OldSidebar() {
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-details">
        <FontAwesomeIcon
          icon={faHome}
          className="icon"
          color="white"
          style={{ fontSize: "18px" }}
        />
        <span className="logo-name">MY BANDA</span>
      </div>
      <ul className="sidebar-nav-links">
        <li>
          <Link
            to="/sellerdash"
            className={location.pathname === "/sellerdash" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faThLarge} className="icon" color="white" />
            <span className="links-name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className={location.pathname === "/orders" ? "active" : ""}
          >
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="icon"
              color="white"
            />
            <span className="links-name">Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/sellerproducts"
            className={location.pathname === "/sellerproducts" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faBox} className="icon" color="white" />
            <span className="links-name">Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/customers"
            className={location.pathname === "/customers" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faUsers} className="icon" color="white" />
            <span className="links-name">Customers</span>
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className={location.pathname === "/analytics" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faSignal} className="icon" color="white" />
            <span className="links-name">Analytics</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={location.pathname === "/settings" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faCog} className="icon" color="white" />
            <span className="links-name">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default OldSidebar;
