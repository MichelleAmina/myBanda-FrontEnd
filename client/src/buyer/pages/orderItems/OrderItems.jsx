import './orderItems.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { NavLink } from 'react-router-dom';

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'completed';
            case 'pending':
                return 'pending';
            case 'dispatched':
                return 'dispatched';
            case 'assigned':
                return 'assigned';
            default:
                return 'default';
        }
    };

    const subtotal = order.total_price - order.delivery_fee
   
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
                    <h4 className='container-title'>Items in your order</h4>
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
                                            <p className='description'>{item.product.description}</p>
                                            <p>Ksh. {item.product.price}</p>
                                            <p ><span>Qty: </span>{item.quantity}</p>
                                        </div>

                                    </div>
                                    <div className="orderItems-bottom">
                                        <div className="orderItems-bottomLeft">
                                            <span><CheckCircleOutlineIcon className={`orderItems-status-icon ${getStatusColor(order.status)}`}/> {order.status}</span>
                                        </div>
                                        <div className="orderItems-bottomRight">
                                            <ul>
                                                <NavLink style={{textDecoration:"none", color:"#000"}}><li>View Product</li></NavLink>
                                                <span>|</span>
                                                <NavLink style={{textDecoration:"none", color:"#000"}}><li>Buy Again</li></NavLink>
                                            </ul>

                                        </div>
                            
                                    </div>
                                </div>

                            )
                        })
                    }
                    
                </div>


                <div className="orderItems-summary pt-4">
                    <div className="deliveryDetails">
                        <h4>Delivery Details</h4>
                        <h5>Delivery Method</h5>
                        <p>{order.delivery_person.email}</p>
                        <p>{order.delivery_person.contact}</p>
                        <br />
                        <h5 className='mt-2'>Shipping Address</h5>
                        <p>{order.name}</p>
                        <p>{order.delivery_address}</p>
                        <p>{order.country}</p>
                    </div>
                    <div className="orderSummary">
                        <h4>Order Summary</h4>
                        {
                            order.order_items.map((item) => {
                                return(
                                    <div className="orderSummaryItems" key={item.id}>
                                        <span className='orderSummaryTitles'>{item.product.name} </span><span className="orderSummaryValues">{item.quantity}  x  {item.product.price}</span>
                                    </div>
                                    

                                )
                            })
                        }
                        <hr />
                        <div className="orderSummaryItem">
                            <span className='orderSummaryTitle'>Subtotal: </span><span className="orderSummaryValue">{subtotal}</span>
                        </div>
                        <div className="orderSummaryItem">
                            <span className='orderSummaryTitle'>Shipping: </span><span className="orderSummaryValue">{order.delivery_fee}</span>
                        </div>
                        <hr />
                        <div className="orderSummaryItem">
                            <span className='orderSummaryTitle'>Total: </span><span className="orderSummaryValue">{order.total_price}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


export default OrderItems