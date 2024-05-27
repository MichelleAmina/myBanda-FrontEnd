import React, { useState, useEffect } from 'react';
import noOrdersImage from '../../../assets/norders.jpeg';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
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

    const getStatusClass = (status) => {
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
    
    

    if (loading) {
        return (
            <div className="loader">
                <img src="https://i.pinimg.com/originals/c1/bc/d8/c1bcd8a8c945b53da6b29f10a2a553c0.gif" alt="Loading..." />
            </div>
        );
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
                <div className='container-fluid pt-4'>
                    <div className="orderWrapper mb-5">
                        <div className="orderTitle">
                            <h4>You have {orders.length} Previous Order(s)</h4> 
                            <div className="orderTitle-Status">
                                {/* <ul>
                                    <li>Completed</li>
                                    <li>Pending</li>
                                    <li>Dispatched</li>
                                </ul> */}

                            </div>
                            
                        </div>
                        {
                            orders.map((order) => {
                                return(
                                    <div className="orderContainer" key={order.id}>
                                        <div className="orderContainer-top">
                                            <h4>Order Id: {order.id}</h4>
                                            {/* <button>{order.status}</button> */}
                                            <Button className={`status-btn ${getStatusClass(order.status)}`}>{order.status}</Button>
                                        </div>
                                        <div className="orderContainer-bottom">
                                            <div className="bottom-left">
                                                <p><span>Placed On:</span> {order.created_at.substring(0,10)}</p>
                                                <p><span>Total Price:</span> Ksh. {order.total_price}</p>
                                            </div>
                                            <div className="bottom-right">
                                                <NavLink to={`/my_banda/orders/${order.id}`}><Button>View Details</Button></NavLink>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderCompleted;


