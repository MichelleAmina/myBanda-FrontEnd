import { useState } from 'react';
import './pendDeliveriesTable.css';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import { Link } from 'react-router-dom';

const PendDeliveriesTable = () => {
    const columns = [
        { id: 'id', label: 'ID'},
        { id: 'DeliveryLocation', label: 'Delivery Location'},
        { id: 'SellerLocation', label: 'Seller Location'},
        { id: 'Status', label: 'Status'},
        { id: 'Action', label: 'Action', renderCell: (row) => (
            <Link to={{ pathname: "/viewDetails/:id", state: { orderId: row.id } }}>
                <Button className='table-button' style={{ backgroundColor: '#EBC606', color: '#fff', borderRadius: "7px", fontWeight: 'bold' }}>
                    {row.Action}
                </Button>
            </Link>
        )}
    ];

    const rows = [
        { id: 1, DeliveryLocation: 'New York', DeliveryDate: '2024-05-12', SellerLocation: 'Mombasa', Status: 'Dispatched', Action: 'View' },
        { id: 2, DeliveryLocation: 'Los Angeles', DeliveryDate: '2024-05-13', SellerLocation: 'Mombasa', Status: 'Dispatched', Action: 'View' },
        { id: 3, DeliveryLocation: 'Chicago', DeliveryDate: '2024-05-14', SellerLocation: 'Mombasa', Status: 'Dispatched', Action: 'View' },
        { id: 4, DeliveryLocation: 'Houston', DeliveryDate: '2024-05-15', SellerLocation: 'Mombasa', Status: 'Dispatched', Action: 'View' },
        { id: 5, DeliveryLocation: 'Miami', DeliveryDate: '2024-05-16', SellerLocation: 'Mombasa', Status: 'Dispatched', Action: 'View' }
    ];

    const handlechangepage = (event, newpage)=>{
        setPage(newpage);
    }

    const handleRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    return ( 
        <div className='pending-deliveries-table'>
            <Paper className='pending-deliveries-table-container'>
                <TableContainer sx={{maxHeight: '450'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column)=> (
                                    <TableCell style={{backgroundColor:'#0A205A', color:'white'}} key={column.id}>{column.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
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
                rowsPerPageOptions={[5,10,25]}
                page={page}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                component='div'
                onPageChange={handlechangepage}
                onRowsPerPageChange={handleRowsPerPage}
                >

                </TablePagination>
            </Paper>
        </div>
    );
}

export default PendDeliveriesTable;