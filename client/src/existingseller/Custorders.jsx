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
        // Filtering orders based on the seller's shop ID
        // const sellerShopId = data.find(order => order.seller_id === userId)?.shop_id;
        // const sellerOrders = (data || []).filter(order => order.shop_id === sellerShopId);
        // const orderItemsArr = data.map(order => order.order_items)
        // const orderItems = orderItemsArr.flatMap(orderItem => orderItem);
        // const sellerIds = orderItems.map(item => item.product?.shop?.seller_id).filter(sellerId => sellerId === userId);
        // console.log("seller ids", sellerIds)

        // const filteredData = data.filter(sellerId => sellerId === userId)
        // console.log("filteredData", filteredData)



        // Flatten the order items from all orders
        const orderItemsArr = data.map(order => order.order_items);
        const orderItems = orderItemsArr.flatMap(orderItem => orderItem);
          
        // Filter order items where the seller_id matches the userId
        // FROM MMICHELLE ====== THIS ONE GIVES YOU THE ORDERS THAT MATCH THE SELLER ID VERY SPECIFIC
        const sellerOrderItems = orderItems.filter(item => item.product?.shop?.seller_id === userId);
        console.log("Filtered orders:", sellerOrderItems);
          
      
        // FROM MICHELLE THIS FILTERES THE ORDERS PERFECTLY....USE IT!! 
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

  // Function to change current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={handleSearch} />
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
      <ToastContainer />
    </div>
  );
};

export default CustOrders;