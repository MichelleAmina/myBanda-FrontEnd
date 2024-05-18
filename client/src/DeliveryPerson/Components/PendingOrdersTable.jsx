import { useState, useEffect } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import axios from 'axios';
import './pendingOrdersTable.css';

const AvailableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://mybanda-backend-88l2.onrender.com/order');
                setOrders(response.data.filter(order => order.status === 'pending')); // Only show pending orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleAccept = async (orderId) => {
        try {
            await axios.post('https://mybanda-backend-88l2.onrender.com/order', {
                id: orderId,
                status: 'accepted'
            });
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId)); // Remove accepted order from state
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'delivery_address', label: 'Delivery Location' },
        { id: 'SellerLocation', label: 'Seller Location' },
        {
            id: 'Action', label: 'Action', renderCell: (row) => (
                <Button
                    variant="contained"
                    style={{
                        color: '#418107',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        padding: '4px',
                        alignContent: 'center',
                        backgroundColor: '#FFD700', // Ensure styling is correct
                        boxShadow: 'none',
                    }}
                    onClick={() => handleAccept(row.id)}
                >
                    Accept
                </Button>
            )
        }
    ];

    return (
        <div className='pending-deliveries-table'>
            <Paper className='pending-deliveries-table-container'>
                <TableContainer sx={{ maxHeight: '450' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: '#FFD700', color: '#000' }} key={column.id}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id}>
                                                {column.renderCell ? column.renderCell(row) : row[column.id]}
                                            </TableCell>
                                        ))}
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
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Paper>
        </div>
    );
};

export default AvailableOrders;
