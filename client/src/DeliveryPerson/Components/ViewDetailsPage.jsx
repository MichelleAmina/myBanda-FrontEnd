import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './viewDetails.css';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewDetailsPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessGif, setShowSuccessGif] = useState(false);

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
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            return response.json();
        })
        .then(data => {
            setOrderDetails(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
            setError(error);
            setLoading(false);
        });
    }, [orderId]);

    const handleMarkAsDelivered = () => {
        const token = localStorage.getItem('access_token');
        fetch(`https://mybanda-backend-88l2.onrender.com/order/${orderId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'completed' }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            return response.json();
        })
        .then(data => {
            toast.info("You have completed the delivery.", {
                position: "top-center",
            });
            setShowSuccessGif(true);
        })
        .catch(error => {
            console.error('Error updating order status:', error);
        });
    };

    if (loading) {
        return (
            <div className='driverLoader'>
                <img src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif" alt="Loading..." className='w-100'/>
            </div>
        );
    }

    if (error) {
        return <div>Error loading order details: {error.message}</div>;
    }

    if (showSuccessGif) {
        return (
            <div className='success-image'>
                <p className='success-statement'>Thank you for completing the delivery.</p>
                <img src="https://img.freepik.com/free-vector/messenger-concept-illustration_114360-6564.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=ais_user" alt="Success" />
                <p className='success-statement'>Total made on this trip - ${orderDetails.delivery_fee}</p>
            </div>
        );
    }

    if (!orderDetails) {
        return <div>No order details found</div>;
    }

    const uniqueShops = new Map();

    orderDetails.order_items.forEach(item => {
        if (!uniqueShops.has(item.product.shop.id)) {
            uniqueShops.set(item.product.shop.id, item.product.shop);
        }
    });

    return (
        <div className="view-details-container">
            <div className="view-details-row1">
                <div className="view-section-container">
                    <NavLink to="/pendingDeliveries">
                        <button className='backto-table'><ArrowBackIcon /></button>
                    </NavLink>
                    
                    <h2 className="order-id">Order ID: {orderDetails.id}</h2>
                </div>
                <div className="view-section-button-container">
                    <NavLink to='/maps'>
                        <button className="view-completed-delivery-button">View Map</button>
                    </NavLink>
                    <button className="view-completed-delivery-button" onClick={handleMarkAsDelivered}>Delivered</button>
                </div>
            </div>
            <hr />
            <div className="view-details-row">
                <div className="view-section-container">
                    <h3>Customer Details</h3>
                    <div className="view-details-grid">
                        <div>
                            <p ><span className="order-dets-label">Name: </span>{orderDetails.buyer.username}</p>
                            {/* <p className="order-dets-text"></p> */}
                        </div>
                        <div>
                            <p><span className="order-dets-label">Email: </span> {orderDetails.buyer.email}</p>
                            {/* <p className="order-dets-text"></p> */}
                        </div>
                        <div>
                            <p><span className="order-dets-label"> Delivery Address: </span>{orderDetails.delivery_address}</p>
                            {/* <p className="order-dets-text"></p> */}
                        </div>
                        <div>
                            <p><span className="order-dets-label">Phone Number: </span>{orderDetails.contact}</p>
                            {/* <p className="order-dets-text"></p> */}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* <div className="details-row">
                <div className="section-container">
                    <h3>Pickup Location</h3>
                    <div className="details-grid">
                        <div>
                            <p className="order-dets-label">Name:</p>
                            <p className="order-dets-text">{orderDetails.order_items[0]?.product.shop.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Email:</p>
                            <p className="order-dets-text'>{orderDetails.order_items[0]?.product.shop.seller.email}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Address:</p>
                            <p className="order-dets-text'>{orderDetails.order_items[0]?.product.shop.location || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Phone Number:</p>
                            <p className="order-dets-text'>{orderDetails.order_items[0]?.product.shop.seller.contact}</p>
                        </div>
                    </div>
                </div> 
            </div> */}
            <div className="view-details-row">
                <div className="view-section-container">
                    <h3>Order Details</h3>
                    <table className="view-details-table">
                        <thead>
                            <tr>
                                <th className='dev-details-heading'>Product</th>
                                <th className='dev-details-heading'>Quantity</th>
                                <th className='dev-details-heading'>Shop</th>
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
            {/* <hr /> */}
            
            <div className="view-details-row">
                <div className="view-section-container">
                    <h3>Pickup Location</h3>
                    <table className="view-details-table">
                        <thead>
                            <tr>
                                <th className='dev-details-heading'>Shop Name</th>
                                <th className='dev-details-heading'>Email</th>
                                <th className='dev-details-heading'>Address</th>
                                <th className='dev-details-heading'>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...uniqueShops.values()].map((shop, index) => (
                                <tr key={index}>
                                    <td>{shop.name}</td>
                                    <td>{shop.seller.email}</td>
                                    <td>{shop.location}</td>
                                    <td>{shop.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPage;
