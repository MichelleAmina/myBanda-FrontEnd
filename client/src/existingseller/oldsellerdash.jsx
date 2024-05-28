import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import OldSidebar from "./oldside";
import SplineAreaChart from "./SplineAreaChart"; 
import PieChart from "./PieChart";
import "./oldsellerdash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faShoppingCart,
  faUsers,
  faSearch,
  faBell,
  faCreditCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";


const customers = [
  { name: "Customer A", totalSales: 2000 },
  { name: "Customer B", totalSales: 3000 },
  { name: "Customer C", totalSales: 1500 },

];

// Calculate average sales
const averageSales = customers.reduce((acc, customer) => acc + customer.totalSales, 0) / customers.length;

const doughnutData = {
  labels: ["Loss", "Profit"],
  datasets: [
    {
      data: [1100, 2300],
      backgroundColor: ["#FF0000", "#008000"], // Updated colors
    },
  ],
};

const SellerDash = () => {
  // Read from localStorage
  const totalOrders = localStorage.getItem('totalOrders') || 0;
  const totalCustomers = localStorage.getItem('totalCustomers') || 0;
  const totalRevenue = localStorage.getItem('totalRevenue') || 0;

  const total = doughnutData.datasets[0].data.reduce((acc, value) => acc + value, 0);

  return (
    <div className="oldsellerdash-container">
      <div className="oldsellerdash-sidebar">
        <OldSidebar />
      </div>
      
      <div className="oldsellerdash-content">
        <header className="oldsellerdash-header">
          <h1>Welcome Back! 👋</h1>
          <p>We're thrilled to have you here!</p>
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
        </header>
        
        <div className="oldsellerdash-stats">
          <div className="stat-card">
            <div>
              <h3>Total Revenue</h3>
              <p>KES.{totalRevenue}</p>
              <span>Ksh.500 from target sales</span>
            </div>
            <FontAwesomeIcon icon={faCreditCard} color="black" />

          </div>
          <div className="stat-card yellow">
            <div>
              <h3>Total Orders</h3>
              <p>{totalOrders}</p>
              <span>Target 20/month</span>
            </div>
            <FontAwesomeIcon icon={faShoppingCart}  color= "black"/>
          </div>
          <div className="stat-card">
            <div>
              <h3>Total Customers</h3>
              <p>{totalCustomers}</p>
              <span>Target 2/month</span>
            </div>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-card">
            <div>
            <h3>Average Sales</h3>
            <p>KES.{totalRevenue / totalOrders}</p>
            <span>Per Order</span>
            </div>
            <FontAwesomeIcon icon={faCreditCard} color="black" />

      
          </div>

         

        </div>
        <div className="charts-section">
          <SplineAreaChart /> 
          <div className="chart-card">
          <PieChart />

          </div>
        </div>
        <div className="new-list">
          <h3>Recent Orders</h3>
          <div className="new-list-item">
            <img src="https://i5.walmartimages.com/asr/b7d363bb-2e96-48fd-a1f7-b4016a95bb9b.c7c541c69e5190a516a5d52984389e46.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" alt="sale" />
            <div className="new-list-details">
              <div className="new-list-orders">
                <h4>Alice Wanjera</h4>
                <p>KES. 2500.00</p>
                <span>12/05/2024</span>
              </div>
            </div>
          </div>
          <div className="new-list-item">
            <img src="https://i5.walmartimages.com/seo/Meridian-Furniture-Margo-Cognac-Velvet-Sofa_616513c2-b2b6-484e-bcb5-d6494414337c.d0ea796746afeb2ba1cac5f80806e522.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" alt="sale" />
            <div className="new-list-details">
              <div className="new-list-orders">
                <h4>Mary Wambui</h4>
                <p>KES. 25000.00</p>
                <span>24/02/2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDash;
