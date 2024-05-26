import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faFilter, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custorders.css';
import OldSidebar from './oldside';

const CustOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
          id: index + 1, 
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
    const filtered = orders.filter((order) => order.orderId.toLowerCase().includes(term));
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

  const handleChangeStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const response = await fetch(`https://mybanda-backend-88l2.onrender.com/order/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        const updatedOrder = await response.json();
        const updatedOrders = filteredOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order));
        setFilteredOrders(updatedOrders);
        toast(`Order status changed to ${status}`, { type: 'success' });
      } else {
        console.error('Failed to update order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownToggle = (orderId) => {
    setSelectedOrderId(orderId);
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (status) => {
    handleChangeStatus(selectedOrderId, status);
    setDropdownVisible(false);
  };

  const dataToMap = searchTerm || sortOrder ? filteredOrders : orders;

  return (
    <div className="dashboard-container-custorders">
      <OldSidebar activePage="orders" />
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
            <input type="text" placeholder="Search by Order ID..." value={searchTerm} onChange={handleSearch} />
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
        {loading ? (
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif"
            alt="Loading..."
            className="ordloader"
          />
        ) : (
          <table className="order-table-custorders">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Location</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataToMap.map((order) => (
                <tr key={order.id}>
                  <td>{order.buyer.username}</td>
                  <td>{order.order_items[0].product.name}</td>
                  <td>{order.delivery_address}</td>
                  <td>{order.created_at.substring(0, 10)}</td>
                  <td>{order.total_price}</td>
                  <td className={`order-status-custorders ${order.status.toLowerCase()}`}>
                    {order.status}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="clickable"
                      onClick={() => handleDropdownToggle(order.id)}
                    />
                    {dropdownVisible && selectedOrderId === order.id && (
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleDropdownSelect('completed')}>Completed</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownSelect('assigned')}>Assigned</Dropdown.Item>
                      </Dropdown.Menu>
                    )}
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

export default CustOrders;
