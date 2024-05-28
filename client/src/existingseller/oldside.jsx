import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faBox,
  faUsers,
  faSignal,
  faCog,
  faChevronDown,
  faChevronUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import BandaLogo from "../assets/banda.png";
import dashlogo from "../assets/dashboard.png";
import "./oldside.css";
import LogoutIcon from "@mui/icons-material/Logout";

function OldSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProducts, setShowProducts] = useState(false);

  const toggleProducts = (e) => {
    e.preventDefault();
    setShowProducts(!showProducts);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    console.log("user logged out")
    navigate('/login'); 
};

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
          <div
            className={`old-sidebar-link ${showProducts ? "active" : ""}`}
            onClick={(e) => e.preventDefault()}
          >
            <Link
              to="/shopview/defaultSellerId"
              style={{textDecoration:"none"}}
              className={`${
                location.pathname === "/shopview/defaultSellerId" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faHome} className="old-link-icon" />
              <span className="old-link-name">Shop</span>
            </Link>
            <FontAwesomeIcon
              icon={showProducts ? faChevronUp : faChevronDown}
              className="old-link-icon-dropdown"
              onClick={toggleProducts}
            />
          </div>
          {showProducts && (
            <ul className="old-submenu">
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
                  to="/addprod"
                  className={`old-sidebar-link ${
                    location.pathname === "/addprod" ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faPlus} className="old-link-icon" />
                  <span className="old-link-name">Add Product</span>
                </Link>
              </li>
            </ul>
          )}
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
      </ul>

      <div className="logout-button">
      
          <LogoutIcon className="old-link-icon" />
          <span className="old-link-name" onClick={handleLogout}>Logout</span>
  
      </div>
    </div>
  );
}

export default OldSidebar;
