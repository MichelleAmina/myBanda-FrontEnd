import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faFilter, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customers.css'; 
import OldSidebar from './oldside';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Authentication token not found.');
      setLoading(false);
      return;
    }

    const tokenPayload = token.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    const userId = decodedToken.sub;

    console.log('Seller ID:', userId);

    fetch('https://mybanda-backend-88l2.onrender.com/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);

        const orders = data.filter(order => order.order_items.some(item => item.product.shop.seller_id === userId));
        console.log('Filtered orders:', orders);

        const customersData = orders.map(order => ({
          ...order.buyer,
          number_of_orders: orders.filter(o => o.buyer.id === order.buyer.id).length,
          total_spend: orders.filter(o => o.buyer.id === order.buyer.id).reduce((sum, o) => sum + o.total_price, 0),
          last_order_date: orders.filter(o => o.buyer.id === order.buyer.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0].created_at,
          delivery_address: order.delivery_address,
          status: order.status // Assuming you have a status field
        }));
        console.log('Customers data:', customersData);

        const uniqueCustomers = customersData.filter((customer, index, self) =>
          index === self.findIndex((c) => c.username === customer.username)
        );
        console.log('Unique customers:', uniqueCustomers);

        setCustomers(uniqueCustomers);
        setFilteredCustomers(uniqueCustomers);

        // Calculate stats
        const totalOrders = orders.length;
        const totalCustomers = uniqueCustomers.length;
        const totalRevenue = uniqueCustomers.reduce((sum, customer) => sum + customer.total_spend, 0);

        // Store in localStorage
        localStorage.setItem('totalOrders', totalOrders);
        localStorage.setItem('totalCustomers', totalCustomers);
        localStorage.setItem('totalRevenue', totalRevenue);

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
    const filtered = customers.filter((customer) => customer.username.toLowerCase().includes(term));
    setFilteredCustomers(filtered);
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedCustomers = [...customers].sort((a, b) => {
      if (order === 'latest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (order === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return 0;
    });
    setFilteredCustomers(sortedCustomers);
  };

  const dataToMap = searchTerm || sortOrder ? filteredCustomers : customers;

  return (
    <div className="customers-dashboard">
      <OldSidebar activePage="customers" />
      <div className="customers-content">
        {loading ? (
          <div className="loading-container">
            <p>Loading customers...</p>
          </div>
        ) : (
          <>
            {dataToMap.length > 0 ? (
              <>
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
                    <input
                      type="text"
                      placeholder="Search by Customer Name..."
                      className="search-input"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="customers-filter-bar">
                    <select
                      value={sortOrder}
                      onChange={handleSortOrderChange}
                      className="sort-select"
                    >
                      <option value="">Sort by Date</option>
                      <option value="latest">Latest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                    <button onClick={handleSortOrderChange} className="filter-button">
                      <FontAwesomeIcon icon={faFilter} /> Filter
                    </button>
                  </div>
                </div>
                <table className="customers-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Number of Orders</th>
                      <th>Total Spend</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataToMap.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.username || 'Not Specified'}</td>
                        <td>{customer.email || 'Not Specified'}</td>
                        <td>{customer.location || 'Not Specified'}</td>
                        <td>{customer.number_of_orders || 'Not Specified'}</td>
                        <td>{customer.total_spend ? `Ksh. ${customer.total_spend}` : 'Not Specified'}</td>
                        <td>
                          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="nocustomers-container">
                <div className="custtitle">
                  <h1>No customers found</h1>
                </div>
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696455.jpg"
                  alt="No customers found"
                  className="nocustomer-img"
                />
                <h4>All customer-related information will be displayed here.</h4>
                <p>For further assistance, please contact support.</p>
              </div>
            )}
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Customers;
