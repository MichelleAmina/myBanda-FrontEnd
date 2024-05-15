import React from 'react';
import './viewDetails.css';

const ViewDetailsPage = () => {
    const customerDetails = {
        name: 'Rebekah Ndanu',
        email: 'rebekah@gmail.com',
        address: '123 Main St, Mombasa, Kenya',
        phonenumber: '123-456-789'
    };

    const sellerDetails = {
        name: 'Seller Name',
        email: 'seller@example.com',
        address: '456 Market St, Nairobi, Kenya',
        phonenumber: '123-456-789'
    };

    const orderId = 'ABC123XYZ';

    return (
        <div className="view-details-container">
            <div className="section-container">
                <h2>Order ID</h2>
                <h3 className='order-id'>{orderId}</h3>
            </div>

            <div className="section-container">
                <h2>Customer Details</h2>
                <p>Name: {customerDetails.name}</p>
                <p>Email: {customerDetails.email}</p>
                <p>Address: {customerDetails.address}</p>
                <p>Phone Number: {customerDetails.phonenumber}</p>
            </div>

            <div className="section-container">
                <h2>Seller Details</h2>
                <p>Name: {sellerDetails.name}</p>
                <p>Email: {sellerDetails.email}</p>
                <p>Address: {sellerDetails.address}</p>
                <p>Phone Number: {customerDetails.phonenumber}</p>
            </div>

            <div className="section-button-container">
                <button className="completed-delivery-button">Completed Delivery</button>
            </div>
            
        </div>
    );
};

export default ViewDetailsPage;
