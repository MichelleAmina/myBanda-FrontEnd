import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './moreorderdets.css';
import OldSidebar from './oldside';
import { toast } from 'react-toastify';

const MoreOrderDetails = ({ orderId, handleBack }) => {
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

  const handleStatusChange = (newStatus) => {
    console.log('Changing status to', newStatus);
    if (newStatus === 'delivered') {
      toast.success('Order marked as delivered!', { position: 'top-center' });
    } else if (newStatus === 'pending') {
      toast.warning('Order status changed to pending!', { position: 'top-center' });
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container-moreorderdets">
        <OldSidebar activePage="orders" />
        <div className="content-container-moreorderdets">
          <div className="header-moreorderdets">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container-moreorderdets">
        <OldSidebar activePage="orders" />
        <div className="content-container-moreorderdets">
          <div className="header-moreorderdets">
            <h1>Error Loading Order Details</h1>
            <button className="back-button" onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          </div>
          <div className="error-message">{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container-moreorderdets">
      <OldSidebar activePage="orders" />
      <div className="content-container-moreorderdets">
        <div className="header-moreorderdets">
          <h1>Order Details</h1>
          <button className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </div>
        <div className="order-card">
          <h2>Order ID: {orderDetails.id}</h2>
          <p><strong>Customer:</strong> {orderDetails.buyer.username}</p>
          <p><strong>Product:</strong> {orderDetails.order_items[0].product.name}</p>
          <p><strong>Location:</strong> {orderDetails.delivery_address}</p>
          <p><strong>Date:</strong> {orderDetails.created_at.substring(0, 10)}</p>
          <p><strong>Amount:</strong> Ksh. {orderDetails.total_price}</p>
          <div className="status-options">
            <button className="status-button delivered" onClick={() => handleStatusChange('delivered')}>
              <FontAwesomeIcon icon={faCheckCircle} /> Delivered
            </button>
            <button className="status-button pending" onClick={() => handleStatusChange('pending')}>
              <FontAwesomeIcon icon={faTimesCircle} /> Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreOrderDetails;
