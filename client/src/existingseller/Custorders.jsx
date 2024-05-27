import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custorders.css';
import OldSidebar from './oldside';

const CustOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7;

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []); 

  const fetchOrders = () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Authentication token not found.');
      setLoading(false);
      return;
    }
  
    // Decode the token to get the user's ID
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
        // Flatten the order items from all orders
        const orderItemsArr = data.map(order => order.order_items);
        const orderItems = orderItemsArr.flatMap(orderItem => orderItem);
          
        // Filter order items where the seller_id matches the userId
        const sellerOrderItems = orderItems.filter(item => item.product?.shop?.seller_id === userId);
        console.log("Filtered orders:", sellerOrderItems);
          
        const filteredOrders = data.map(order => {
          const filteredOrderItems = order.order_items.filter(item => item.product?.shop?.seller_id === userId);
          return { ...order, order_items: filteredOrderItems };
        }).filter(order => order.order_items.length > 0);
  
        console.log("Filtered Orders with matching Order Items:", filteredOrders);

        setOrders(filteredOrders)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError(error);
        setLoading(false);
      });
  };
  console.log("All orders", orders)


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

  const handleViewOrder = (orderId) => {
    try {
      navigate(`/moreorderdets/${orderId}`);
    } catch (error) {
      console.error('Error navigating to order details:', error);
      setError(error);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = (searchTerm || sortOrder ? filteredOrders : orders).slice(indexOfFirstOrder, indexOfLastOrder);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container-custorders">
    <OldSidebar activePage="orders" />
    <div className="content-container-custorders">
      {loading ? (
        <img
          src="https://i.gifer.com/7YQl.gif"
          alt="Loading..."
          className="ordloader"
        />
      ) : (

            <div className="first-ndorders-container">
              <h1>You have no orders.</h1>
              {currentOrders.length === 0 ? (
                <div className="ndorders-container">
                  <img className='ndorder-img' src="https://img.freepik.com/premium-vector/young-girl-is-standing-mobile-phone-girl-tap-screen-denial-access_530883-354.jpg?size=626&ext=jpg&uid=R101083988&ga=GA1.1.1434105621.1716803206&semt=ais_user" alt="Empty orders" />
                  <h4 >All order related information will be displayed here.</h4>
                  <p>For further assistance, please contact support.</p>
                </div>
            ) : (
              <div>
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
                    {currentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.buyer.username || "Not Specified"}</td>
                        <td>{order.order_items[0].product.name || "Not Specified"}</td>
                        <td>{order.delivery_address || "Not Specified"}</td>
                        <td>{order.created_at.substring(0, 10)}</td>
                        <td>Ksh. {order.total_price}</td>
                        <td className={`order-status-custorders ${order.status.toLowerCase()}`}>
                          {order.status}
                        </td>
                        <td>
                          <button 
                            className="custview-button"
                            onClick={() => {
                              console.log('Clicked VIEW button for order:', order.id);
                              handleViewOrder(order.id);
                            }} 
                          >
                            view
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <ul className="pagination">
                  {Array(Math.ceil((searchTerm || sortOrder ? filteredOrders : orders).length / ordersPerPage))
                    .fill()
                    .map((_, index) => (
                      <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                        <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustOrders;
