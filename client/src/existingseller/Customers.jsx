import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faEdit,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import "./customers.css";
import OldSidebar from "./oldside";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

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
      id: 2,
      name: "Jane Doe",
      email: "janen@gmail.com",
      orders: 8,
      spent: "Ksh.1800",
      address: "Karen, Nairobi",
    },
    {
      id: 3,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      orders: 15,
      spent: "Ksh.3000",
      address: "Nakuru, Kenya",
    },
    {
      id: 4,
      name: "David Kimani",
      email: "davidk@gmail.com",
      orders: 20,
      spent: "Ksh.4000",
      address: "Thika, Kenya",
    },
    {
      id: 5,
      name: "Sarah Wangari",
      email: "sarahw@gmail.com",
      orders: 10,
      spent: "Ksh.2500",
      address: "Kisumu, Kenya",
    },
    {
      id: 6,
      name: "James Mwangi",
      email: "jamesm@gmail.com",
      orders: 18,
      spent: "Ksh.3500",
      address: "Mombasa, Kenya",
    },
    {
      id: 7,
      name: "Emily Njeri",
      email: "emilyn@gmail.com",
      orders: 6,
      spent: "Ksh.1500",
      address: "Eldoret, Kenya",
    },
    {
      id: 8,
      name: "Peter Kamau",
      email: "peterk@gmail.com",
      orders: 14,
      spent: "Ksh.2700",
      address: "Kakamega, Kenya",
    },
    {
      id: 9,
      name: "Alice Wanjiku",
      email: "alicew@gmail.com",
      orders: 16,
      spent: "Ksh.3200",
      address: "Nyeri, Kenya",
    },
    {
      id: 10,
      name: "Joseph Nyaga",
      email: "josephn@gmail.com",
      orders: 22,
      spent: "Ksh.4200",
      address: "Kiambu, Kenya",
    },
  ];
  


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(term)
    );
    setFilteredCustomers(filtered);
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedCustomers = [...customers].sort((a, b) => {
      if (order === "highest") {
        return b.orders - a.orders;
      } else if (order === "lowest") {
        return a.orders - b.orders;
      }
      return 0;
    });
    setFilteredCustomers(sortedCustomers);
  };

  const dataToMap = searchTerm || sortOrder ? filteredCustomers : customers;

  return (
    <div className="customers-dashboard">
      <OldSidebar />
      <div className="customers-content">
        <div className="customers-header">
          <h1>Customers</h1>
          <div className="customers-header-icons">
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="customers-sub-header">
          <p>View and manage your customers</p>
        </div>
        <div className="customers-search-bar-container">
          <div className="customers-search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="customers-filter-bar">
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="">Number Of Orders</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
            <button>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <table className="customers-table">
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
                  <FontAwesomeIcon icon={faEdit} className="edit-icon" />
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
