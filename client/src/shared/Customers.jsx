// existing seller- customer page - this file displays a list of customers for an s=existing seller who has sold products

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons"; // Importing necessary icons
import "../customers.css";
import Sidebar from "./Sidebar";

const Customers = () => {
  // Dummy data for customers
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const customers = [
    {
      id: 1,
      name: "Mary Ann",
      email: "maryann@gmail.com",
      orders: 12,
      spent: "Ksh.2250",
      address: "Amboseli, Lavington",
    },
    {
        id: 1,
        name: "Jane",
        email: "janen@gmail.com",
        orders: 12,
        spent: "Ksh.2250",
        address: "Amboseli, Lavington",
      },

  ];

  // Function to handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(term)
    );
    setFilteredCustomers(filtered);
  };

  //mapping to search
  const dataToMap = searchTerm ? filteredCustomers : customers;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        <div className="header">
          <h1>Customers</h1>
          <div className="header-icons">

            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="sub-header">
          <p>View and manage your customers</p>
        </div>
        <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
  
        </div>
  
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Spent</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          
            {dataToMap.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.orders}</td>
                <td>{customer.spent}</td>
                <td>{customer.address}</td>
                <td>
                  <FontAwesomeIcon icon={faEllipsisV} />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
