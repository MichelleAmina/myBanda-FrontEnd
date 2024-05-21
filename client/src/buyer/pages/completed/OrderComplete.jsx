import React, { useState, useEffect } from 'react';
import noOrdersImage from '../../../assets/norders.jpeg';
import { NavLink } from 'react-router-dom';
import "./orderComplete.css"

const OrderCompleted = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                // const response = await fetch('/api/orders'); 
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
                <div>Your orders will be displayed here.</div>
            )}
        </div>
    );
}

export default OrderCompleted;
