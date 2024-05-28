import React from "react";
import { Link, useLocation,useNavigate } from "react-router-dom"; // Removed useHistory from here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faShoppingBag,
  faBox,
  faUsers,
  faSignal,
  faCog,
  faSignOutAlt // Import the logout icon
} from "@fortawesome/free-solid-svg-icons";
import BandaLogo from "../assets/banda.png";
import dashlogo from "../assets/dashboard.png";
import "./sellersidebar.css";

function NewSellerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    
    // Redirect the user to the login page
    navigate("/login");
  };

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

      <div className="new-logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
        <span className="logout-text">Logout</span>
      </div>
    </div>
  );
}

export default NewSellerSidebar;
