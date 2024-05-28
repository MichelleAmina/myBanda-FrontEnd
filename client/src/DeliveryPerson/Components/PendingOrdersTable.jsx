import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';

const noDataImage = 'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544940.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716422400&semt=ais_user';

const AvailableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const tokenPayload = token.split('.')[1];
        const decodedToken = JSON.parse(atob(tokenPayload));
        const id = decodedToken.sub;

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
            const pendingOrders = (data || []).filter(order => order.delivery_id === id && order.status === 'pending');
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

    if (loading) {
        return (
            <div className='driverLoader'>
                <img src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif" alt="" className='w-100'/>
            </div>
        );
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

        fetch(`https://mybanda-backend-88l2.onrender.com/order/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 'assigned' }),
        })
        .then(response => {
            if (response.ok) {
                toast.info("You have been assigned the order.", {
                    position: "top-center",
                });
                setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
                setFilteredOrders(prevOrders => prevOrders.filter(order => order.id !== id));
            } else {
                return response.json().then(errorData => {
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
                {filteredOrders.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <img src={noDataImage} alt="No data" style={{ width: '400px', height: "50vh", margin: '20px 0' }} />
                        <p>No available orders at the moment.</p>
                    </div>
                ) : (
                    <>
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
                                            <TableCell>{order.delivery_address}</TableCell>
                                            <TableCell>{order.order_items[0]?.product.shop.name || 'N/A'}</TableCell>
                                            <TableCell>{order.order_items[0]?.product.shop.location || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleAcceptOrder(order.id)} style={{ backgroundColor: 'rgb(194, 251, 194)', color: 'darkgreen' }}>Accept</Button>
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
                    </>
                )}
            </Paper>
        </div>
    );
};

export default AvailableOrders;
