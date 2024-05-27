import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OldSidebar from './oldside';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './moreorderdets.css';

const MoreOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Authentication token not found.');
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    fetch(`https://mybanda-backend-88l2.onrender.com/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then((data) => {
        setOrderDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
        setError(error);
        setLoading(false);
      });
  }, [orderId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDispatchOrder = () => {
    const token = localStorage.getItem('access_token');
    fetch(`https://mybanda-backend-88l2.onrender.com/order/${orderId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'dispatched' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to dispatch order');
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Order has been dispatched successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          animation: true,
        });
        setOrderDetails(data);
      })
      .catch((error) => {
        console.error('Error dispatching order:', error);
        toast.error('Failed to dispatch order. Please try again later.');
      });
  };

  if (loading) {
    return (
      <div className="driverLoader">
        <img
          src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif"
          alt="Loading..."
          className="w-100"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error loading order details: {error.message}</div>;
  }

  if (!orderDetails) {
    return <div>No order details found</div>;
  }

  return (
    <div className="dashboard-container-moreorderdetails">

      <OldSidebar activePage="orders" />
      <div className="content-container-moreorderdetails">
        <div className="header-moreorderdetails">
          <h1>Order Details</h1>
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
        </div>
        <div className="details-container">
          <div className="details-row1">
            <div className="section-container">
              <h2 className="order-id">Order ID: {orderDetails.id}</h2>
            </div>
            <div className="section-button-container">
              {orderDetails.status === 'assigned' && (
                <Button variant="contained" onClick={handleDispatchOrder}>
                  Dispatch Order
                </Button>
              )}
            </div>
          </div>
          <hr />
          <div className="details-row">
            <div className="section-container">
              <h3>Order Details</h3>
              <table className="details-table">
                <thead>
                  <tr>
                    <th className="dev-details-heading">Product</th>
                    <th className="dev-details-heading">Quantity</th>
                    <th className="dev-details-heading">Shop</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.order_items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product.shop.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="details-row">
            <div className="section-container">
              <h3>Customer Details</h3>
              <div className="details-grid">
                <div>
                  <p className="order-dets-label">Name:</p>
                  <p className="order-dets-text">{orderDetails.buyer.username}</p>
                </div>
                <div>
                  <p className="order-dets-label">Email:</p>
                  <p className="order-dets-text">{orderDetails.buyer.email}</p>
                </div>
                <div>
                  <p className="order-dets-label">Delivery Address:</p>
                  <p className="order-dets-text">{orderDetails.delivery_address}</p>
                </div>
                <div>
                  <p className="order-dets-label">Phone Number:</p>
                  <p className="order-dets-text">{orderDetails.contact}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="details-row">
            <div className="section-container">
              <h3>Pickup Location</h3>
              <div className="details-grid">
                <div>
                  <p className="order-dets-label">Name:</p>
                  <p className="order-dets-text">
                    {orderDetails.order_items[0]?.product.shop.name || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="order-dets-label">Email:</p>
                  <p className="order-dets-text">
                    {orderDetails.order_items[0]?.product.shop.seller.email}
                  </p>
                </div>
                <div>
                  <p className="order-dets-label">Address:</p>
                  <p className="order-dets-text">
                    {orderDetails.order_items[0]?.product.shop.location || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="order-dets-label">Phone Number:</p>
                  <p className="order-dets-text">
                    {orderDetails.order_items[0]?.product.shop.seller.contact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MoreOrderDetails;