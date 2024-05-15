import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "../custorders.css";
import Sidebar from "./Sidebar";

const CustOrders = () => {
  // Dummy data for orders
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const orders = [
    {
      id: 1,
      orderId: "#235334",
      customer: "Ann Mary",
      product: "Gas Cooker",
      location: "Rhapta, Westlands",
      date: "05-14-2024",
      amount: "KES.8600",
      status: "Delivered",
    },
    {
      id: 2,
      orderId: "#135335",
      customer: "John Doe",
      product: "Electric Kettle",
      location: "CBD, Nairobi",
      date: "05-15-2024",
      amount: "KES.1200",
      status: "Pending",
    },
    {
      id: 3,
      orderId: "#735336",
      customer: "Jane Smith",
      product: "Microwave Oven",
      location: "Kileleshwa, Nairobi",
      date: "05-16-2024",
      amount: "KES.4500",
      status: "Delivered",
    },
    {
      id: 4,
      orderId: "#335334",
      customer: "Winnie Sei",
      product: "Coffee Frother",
      location: "Rhapta, Westlands",
      date: "05-14-2024",
      amount: "KES.8600",
      status: "Delivered",
    },

  ];

  // Function to handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter((order) =>
      order.orderId.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  // mapping to search 
  const dataToMap = searchTerm ? filteredOrders : orders;

  return (
    <div className="dashboard-container">
      <Sidebar activePage="orders" />
      <div className="content-container">
        <div className="header">
          <h1>Orders</h1>
          <div className="header-icons">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="sub-header">
          <p>See below all your orders!</p>
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Location</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            {dataToMap.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.location}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustOrders;
