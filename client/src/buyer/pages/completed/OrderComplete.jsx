import React, { useState, useEffect } from 'react';
import noOrdersImage from '../../../assets/norders.jpeg';

const OrderCompleted = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders'); // replace with your actual API endpoint
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
            <div>
                <img src={noOrdersImage} alt="No completed orders" />
                <p>No completed orders found.</p>
            </div>
            ) : (
                <div>Your orders will be displayed here.</div>
            )}
        </div>
    );
}

export default OrderCompleted;
