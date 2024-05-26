import './orderItems.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function OrderItems(){
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`https://mybanda-backend-88l2.onrender.com/order/${orderId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order:', error);
                setLoading(false);
                setError(error);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="loader">
                <img src="https://i.pinimg.com/originals/c1/bc/d8/c1bcd8a8c945b53da6b29f10a2a553c0.gif" alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return(
        <div className="container-fluid pt-4">
            <h1>Order Details for Order ID: {order.id}</h1>
        </div>
    )
}


export default OrderItems