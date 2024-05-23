import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField } from '@mui/material';

const AvailableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Authentication token not found.');
                }
    
                const response = await fetch('https://mybanda-backend-3.onrender.com/order', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
    
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }
    
                const pendingOrders = data.filter(order => order.status === 'pending');
                setOrders(pendingOrders);
                setFilteredOrders(pendingOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
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

    const handleAcceptOrder = (orderId) => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        // If token is not available, handle the authentication error or redirect to login page
        if (!token) {
            console.error('Authentication token not found.');
            // Handle authentication error (e.g., redirect to login page)
            return;
        }

        // Send a PATCH request to update the status
        fetch(`https://mybanda-backend-3.onrender.com/order/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
            body: JSON.stringify({ status: 'assigned' }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Order status updated successfully.');
                // Remove the accepted order from the state
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
                setFilteredOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            } else {
                console.error('Failed to update order status.');
            }
        })
        .catch(error => console.error('Error updating order:', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='pending-deliveries-table' style={{ padding: '10px' }}>
            <Paper className='pending-deliveries-table-container' sx={{ padding: '10px' }}>
                {/* <TextField
                    label="Search by Buyer"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                /> */}
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
                                    <TableCell>N/A</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleAcceptOrder(order.id)}>Accept</Button>
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
