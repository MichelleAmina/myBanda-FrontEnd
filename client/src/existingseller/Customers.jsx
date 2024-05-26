import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faFilter, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customers.css'; 
import OldSidebar from './oldside';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []); 

  const fetchOrders = () => {
    setLoading(true);
    fetch('https://mybanda-backend-88l2.onrender.com/order', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        // Generate random IDs for each order
        const ordersWithRandomIds = data.map((order, index) => ({
          ...order,
          id: index + 1, // Assuming index starts from 0
        }));
        setOrders(ordersWithRandomIds);
        setFilteredOrders(ordersWithRandomIds);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError(error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter((order) => order.buyer.username.toLowerCase().includes(term));
    setFilteredOrders(filtered);
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedOrders = [...orders].sort((a, b) => {
      if (order === 'latest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (order === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return 0;
    });
    setFilteredOrders(sortedOrders);
  };

  const dataToMap = searchTerm || sortOrder ? filteredOrders : orders;

  return (
    <div className="customers-dashboard">
      <OldSidebar activePage="customers" />
      <div className="customers-content">
        <div className="customers-header">
          <h1>Customers</h1>
          <div className="customers-header-icons">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="customers-sub-header">
          <p>See below all your customers!</p>
        </div>
        <div className="customers-search-bar-container">
          <div className="customers-search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search by Customer Name..." className="search-input" value={searchTerm} onChange={handleSearch} />
          </div>
          <div className="customers-filter-bar">
            <select value={sortOrder} onChange={handleSortOrderChange} className="sort-select">
              <option value="">Sort by Date</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <button onClick={handleSortOrderChange} className="filter-button">
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
          </div>
        </div>
        {loading ? (
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif"
            alt="Loading..."
            className="customer-loader"
          />
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Contact</th>
               {/*<th>Address</th> */}
                <th>Spent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataToMap.map((order) => (
                <tr key={order.id}>
                  <td>{order.buyer.username}</td>
                  <td>{order.buyer.email}</td>
              {/*<td>{order.buyer.contact}</td> */}
                  <td>{order.buyer.spent}</td>
                  <td>{order.total_price}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Customers;
