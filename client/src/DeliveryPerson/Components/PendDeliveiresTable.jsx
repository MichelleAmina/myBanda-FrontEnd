import React, { useState, useEffect } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import './pendDeliveriesTable.css';

const PendDeliveriesTable = () => {
    const columns = [
        { id: 'buyer', label: 'Buyer' },
        { id: 'buyerLocation', label: 'Buyer Location' },
        { id: 'shop', label: 'Shop' },
        { id: 'shopLocation', label: 'Shop Location' },
        { id: 'action', label: 'Action' }
    ];

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
            const relevantOrders = (data || []).filter(order => ['assigned', 'dispatched'].includes(order.status));
            setOrders(relevantOrders);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setError(error);
            setLoading(false);
        });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) {
        return (
            <div className='driverLoader'>
                <img src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif" alt="Loading..." className='w-100'/>
            </div>
        );
    }

    if (error) {
        return <div>Error loading deliveries data: {error.message}</div>;
    }

    return ( 
        <div className='pending-deliveries-table'>
            <Paper className='pending-deliveries-table-container'>
                <TableContainer sx={{ maxHeight: 450 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#FFD700', color: '#000' }} key={column.id}>{column.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{order.buyer.username}</TableCell>
                                        <TableCell>{order.buyer.location}</TableCell>
                                        <TableCell>{order.order_items[0]?.product.shop.name || 'N/A'}</TableCell>
                                        <TableCell>{order.order_items[0]?.product.shop.location || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Link to={`/viewDetails/${order.id}`}>
                                                <Button >View</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    page={page}
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    component='div'
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default PendDeliveriesTable;
