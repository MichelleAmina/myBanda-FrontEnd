import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser, faFilter } from "@fortawesome/free-solid-svg-icons";
import "./custorders.css";
import OldSidebar from "./oldside"; 

const CustOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const orders = [
    {
      id: 1,
      orderId: "#235334",
      customer: "Ann Mary",
      product: "Gas Cooker",
      location: "Rhapta, Westlands",
      date: "2024-05-14",
      amount: "KES.8600",
      status: "Delivered",
    },
    {
      id: 2,
      orderId: "#135335",
      customer: "John Doe",
      product: "Electric Kettle",
      location: "CBD, Nairobi",
      date: "2024-05-15",
      amount: "KES.1200",
      status: "Pending",
    },
    {
      id: 3,
      orderId: "#735336",
      customer: "Jane Smith",
      product: "Microwave Oven",
      location: "Kileleshwa, Nairobi",
      date: "2024-05-16",
      amount: "KES.4500",
      status: "Delivered",
    },
    {
      id: 4,
      orderId: "#335334",
      customer: "Winnie Sei",
      product: "Coffee Frother",
      location: "Rhapta, Westlands",
      date: "2024-05-14",
      amount: "KES.8600",
      status: "Delivered",
    },
    {
      id: 5,
      orderId: "#435337",
      customer: "Paul Njoroge",
      product: "Blender",
      location: "Parklands, Nairobi",
      date: "2024-05-17",
      amount: "KES.3500",
      status: "Delivered",
    },
    {
      id: 6,
      orderId: "#535338",
      customer: "Lucy Wambui",
      product: "Toaster",
      location: "Langata, Nairobi",
      date: "2024-05-18",
      amount: "KES.2200",
      status: "Pending",
    },
    {
      id: 7,
      orderId: "#635339",
      customer: "Michael Kariuki",
      product: "Juicer",
      location: "Karen, Nairobi",
      date: "2024-05-19",
      amount: "KES.4100",
      status: "Delivered",
    },
    {
      id: 8,
      orderId: "#735340",
      customer: "Susan Karanja",
      product: "Food Processor",
      location: "Lavington, Nairobi",
      date: "2024-05-20",
      amount: "KES.5500",
      status: "Pending",
    },
    {
      id: 9,
      orderId: "#835341",
      customer: "Daniel Mwangi",
      product: "Rice Cooker",
      location: "Gigiri, Nairobi",
      date: "2024-05-21",
      amount: "KES.2900",
      status: "Delivered",
    },
    {
      id: 10,
      orderId: "#935342",
      customer: "Esther Wanjiku",
      product: "Air Fryer",
      location: "Kahawa West, Nairobi",
      date: "2024-05-22",
      amount: "KES.3800",
      status: "Pending",
    },
  ];
  

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter((order) =>
      order.orderId.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedOrders = [...orders].sort((a, b) => {
      if (order === "latest") {
        return new Date(b.date) - new Date(a.date);
      } else if (order === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
    setFilteredOrders(sortedOrders);
  };

  const dataToMap = searchTerm || sortOrder ? filteredOrders : orders;

  return (
    <div className="dashboard-container-custorders">
      <OldSidebar activePage="orders"/>
      <div className="content-container-custorders">
        <div className="header-custorders">
          <h1>Orders</h1>
          <div className="header-icons-custorders">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="sub-header-custorders">
          <p>See below all your orders!</p>
        </div>
        <div className="search-filter-container-custorders">
          <div className="search-bar-custorders">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-bar-custorders">
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="">Sort by Date</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <button onClick={handleSortOrderChange}>
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
          </div>
        </div>
        <table className="order-table-custorders">
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
                <td className={`order-status-custorders ${order.status.toLowerCase()}`}>
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
