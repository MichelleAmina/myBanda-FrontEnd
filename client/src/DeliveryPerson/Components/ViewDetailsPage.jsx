import React from 'react';
import { useParams } from 'react-router-dom';
import './viewDetails.css';

const ViewDetailsPage = () => {
    const { orderId } = useParams();

    // Mock data
    const orderDetails = {
        orderId: orderId,
        products: [
            { name: 'Jumper', quantity: 2, price: 50 },
            { name: 'Bottle', quantity: 1, price: 100 },
        ]
    };

    const customerDetails = {
        name: 'Rebekah Ndanu',
        email: 'rebekah@gmail.com',
        address: '123 Main St, Mombasa, Kenya',
        phoneNumber: '123-456-789'
    };

    const sellerDetails = {
        name: 'Marie Shop',
        email: 'marieshop@gmail.com',
        address: '456 Market St, Nairobi, Kenya',
        phoneNumber: '123-456-789'
    };

    return (
        <div className="details-container">
            <div className="details-row1">
                <div className="section-container">
                    <h2 className="order-id">Order ID: {orderDetails.orderId}</h2>
                </div>
                <div className="section-button-container">
                    <button className="completed-delivery-button">Delivered</button>
                </div>
            </div>
            <hr />
            <div className="details-row">
                <div className="section-container">
                    <h3>Order Details</h3>
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th className='dev-details-heading'>Product</th>
                                <th className='dev-details-heading'>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            )
                        )}
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
                            <p className="order-dets-text">{customerDetails.name}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Email:</p>
                            <p className="order-dets-text">{customerDetails.email}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Delivery Address:</p>
                            <p className="order-dets-text">{customerDetails.address}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Phone Number:</p>
                            <p className="order-dets-text">{customerDetails.phoneNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="section-container">
                    <h3>Seller Details</h3>
                    <div className="details-grid">
                        <div>
                            <p className="order-dets-label">Name:</p>
                            <p className="order-dets-text">{sellerDetails.name}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Email:</p>
                            <p className="order-dets-text">{sellerDetails.email}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Pickup Address:</p>
                            <p className="order-dets-text">{sellerDetails.address}</p>
                        </div>
                        <div>
                            <p className="order-dets-label">Phone Number:</p>
                            <p className="order-dets-text">{sellerDetails.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPage;
