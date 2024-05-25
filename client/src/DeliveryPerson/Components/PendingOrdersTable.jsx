import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField } from '@mui/material';

const AvailableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://mybanda-backend-88l2.onrender.com/order', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return response.json();
        })
        .then(data => {
            const pendingOrders = (data || []).filter(order => order.status === 'pending');

            setOrders(pendingOrders);
            setFilteredOrders(pendingOrders);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setError(error);
            setLoading(false);
        });
    }, []); 
    


    useEffect(() => {
        const filtered = orders.filter(order =>
            order.buyer.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(filtered);
    }, [searchTerm, orders]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if(loading){
        return (
        <div className='driverLoader'>
            <img src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif" alt="" className='w-100'/>
        </div>
        )
    }

    if (error) {
        return <div>Error loading vendor data</div>;
    }

    const handleAcceptOrder = (id) => {
        const token = localStorage.getItem('access_token');
    
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
    
        console.log('Attempting to accept order:', id);
    
        fetch(`https://mybanda-backend-88l2.onrender.com/order/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

            body: JSON.stringify({ status: 'assigned' }), 
        })
        .then(response => {

            console.log('Response status:', response.status);
    

            if (response.ok) {
                console.log('Order status updated successfully.');
                setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
                setFilteredOrders(prevOrders => prevOrders.filter(order => order.id !== id));
            } else {
                return response.json().then(errorData => {
                    console.error('Failed to update order status.', errorData);
                    throw new Error('Failed to update order status');
                });
            }
        })
        .catch(error => {
            console.error('Error updating order:', error);
        });
    };
    
    
    return (
        <div className='pending-deliveries-table' style={{ padding: '10px' }}>
            <Paper className='pending-deliveries-table-container' sx={{ padding: '10px' }}>
                <TableContainer sx={{ maxHeight: 450 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Buyer</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Buyer Location</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Shop</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Shop Location</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{order.buyer.username}</TableCell>
                                    <TableCell>{order.buyer.location}</TableCell>
                                    <TableCell>{order.order_items[0]?.product.shop.name || 'N/A'}</TableCell>
                                    <TableCell>{order.order_items[0]?.product.shop.location || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button className='accept-button' onClick={() => handleAcceptOrder(order.id)}>Accept</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    page={page}
                    count={filteredOrders.length}
                    rowsPerPage={rowsPerPage}
                    component='div'
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default AvailableOrders;
