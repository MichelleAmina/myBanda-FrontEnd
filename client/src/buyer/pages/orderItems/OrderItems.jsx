import './orderItems.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


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

    console.log("order item", order);

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
        <div className="container-fluid pt-4 pb-4">
            <div className="orderItemsWrapper mb-5">
                <div className="orderItemsTitle">
                    <h4>Order no: {order.id}</h4>
                    <p>{order.created_at.substring(0,10)}</p>
                    <p>{order.order_items.length} Items</p>
                    <p><span>Total Price: Ksh. {order.total_price}</span></p>
                </div>
                <div className="orderItemsContainer pt-4">
                    <h4>Items in your order</h4>
                    {
                        order.order_items.map((item) => {
                            return(
                                <div className="orderItems" key={item.id}>
                                    <div className="orderItems-top">
                                        <div className="orderItems-img">
                                            <img src={item.product.images[0].image_url} alt=""/>
                                        </div>
                                        <div className="orderItems-description">
                                            <h4>{item.product.name}</h4>
                                            <p>{item.product.description}</p>
                                            <p>Ksh. {item.product.price}</p>
                                            <p><span>Qty: </span>{item.quantity}</p>
                                        </div>

                                    </div>
                                    <div className="orderItems-bottom">
                                        <div className="orderItems-bottomLeft">
                                            <span><CheckCircleOutlineIcon/> Delivered</span>
                                        </div>
                                        <div className="orderItems-bottomRight">
                                            <ul>
                                                <li>View Product</li>
                                                <span>/</span>
                                                <li>Buy Again</li>
                                            </ul>

                                        </div>
                            
                                    </div>
                                </div>

                            )
                        })
                    }
                    
                </div>
            </div>
            
        </div>
    )
}


export default OrderItems