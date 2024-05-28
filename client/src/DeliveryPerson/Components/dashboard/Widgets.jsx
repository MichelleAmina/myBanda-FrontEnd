import React, { useState, useEffect } from 'react';
import './widgets.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WalletIcon from '@mui/icons-material/Wallet';
import PaidIcon from '@mui/icons-material/Paid';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';

const Widget = ({ type }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('Authentication token not found.');
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }
        // decode the token to get the user's ID
        const tokenPayload = token.split('.')[1]; 
        const decodedToken = JSON.parse(atob(tokenPayload)); 
        const id = decodedToken.sub; 
    
        console.log('User ID:', id);

        fetch('https://mybanda-backend-88l2.onrender.com/order', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return response.json();
        })
        .then(data => {
            if (type === "Available deliveries") {
                const availableCount = (data || []).filter(order => order.delivery_id === id && order.status === 'pending').length;
                setCount(availableCount);
            } else if (type === "Completed deliveries") {
                const completedCount = (data || []).filter(order => order.delivery_id === id && order.status === 'completed').length;
                setCount(completedCount);
            } else if (type === "Pending deliveries") {
                const pendingCount = (data || []).filter(order => order.delivery_id === id && ['assigned', 'dispatched'].includes(order.status)).length;
                setCount(pendingCount);
            } else if (type === "Earnings") {
                const totalEarnings = (data || [])
                    .filter(order => order.delivery_id === id && order.status === 'completed')
                    .reduce((total, order) => total + parseFloat(order.delivery_fee || 0), 0);
                setCount(totalEarnings);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setError(error);
            setLoading(false);
        });
    }, [type]);

    let data;

    switch (type) {
        case "Available deliveries":
            data = {
                title: "Available deliveries",
                isMoney: false,
                link: "See all pending",
                path: '/driverhomepage',
                icon: <PendingActionsIcon 
                    className='icon' 
                    style={{color: "crimson"}}
                    />,
            };
            break;
        case "Completed deliveries":
            data = {
                title: "Completed deliveries",
                isMoney: false,
                link: "View completed deliveries",
                path: "/completedDeliveries",
                icon: <TaskIcon 
                className='icon' 
                style={{color: "orange"}}
                />,
            };
            break;
        case "Earnings":
            data = {
                title: "Earnings",
                isMoney: true,
                link: "View net earnings",
                path: "/completedDeliveries",
                icon: <PaidIcon 
                className='icon' 
                style={{color: "green"}}
                />,
            };
            break;
        case "Pending deliveries":
            data = {
                title: "Pending deliveries",
                isMoney: false,
                link: "View pending deliveries",
                path: "/pendingDeliveries",
                icon: <PendingActionsIcon 
                className='icon' 
                style={{color: "purple"}}
                />,
            };
            break;
        case "Wallet":
            data = {
                title: "Wallet",
                isMoney: true,
                link: "View details",
                path: "",
                icon: <WalletIcon 
                className='icon' 
                style={{color: "purple"}}
                />,
            };
            break;
        default:
            break;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="count">{data.isMoney ? `Ksh.${count}` : count}</span>
                <Link to={data.path} className="widget-link">{data.link}</Link>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
