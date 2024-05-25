import React, { useState, useEffect } from 'react';
import noOrdersImage from '../../../assets/norders.jpeg';
import { NavLink } from 'react-router-dom';
import "./orderComplete.css"

const OrderCompleted = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const accessToken = localStorage.getItem('access_token');

    //Decoding the JWT token to get the payload
    const tokenParts = accessToken.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));

    //Extracting the user ID from the payload
    const userId = payload.sub;
    console.log('User ID:', userId);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://mybanda-backend-88l2.onrender.com/order", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredData = data.filter(order => order.buyers_id === userId);
                setOrders(filteredData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
                setError(error);
            }
        };

        fetchOrders();
    }, []);

    console.log("the orders", orders)
    
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {orders.length === 0 ? (
            <div className='no-orders'>
                <p>No completed orders found.</p>
                <img src={noOrdersImage} alt="No completed orders" />
                <div className="start-shopping">
                    <NavLink to="/my_banda/products">
                        <button>Start Shopping</button>
                    </NavLink>
                </div>
            </div>
            ) : (
                <div className='container-fluid pt-3'>Your orders will be displayed here.</div>
            )}
        </div>
    );
}

export default OrderCompleted;
