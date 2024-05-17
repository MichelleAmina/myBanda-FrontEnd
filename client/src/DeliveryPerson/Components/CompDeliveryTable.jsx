import { useState } from 'react';
import './compDeliveriesTable.css';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import { Link } from 'react-router-dom';

const CompDeliveriesTable = () => {
    const columns = [
        { id: 'id', label: 'ID'},
        { id: 'DeliveryLocation', label: 'Delivery Location'},
        { id: 'DeliveryDate', label: 'Delivery Date'},
        { id: 'Earnings', label: 'Earnings'},
        { id: 'Status', label: 'Status'},
        { id: 'Action', label: 'Action', renderCell: (row) => (
            <Link to= {`/viewDetails/${row.id}`} >
                <Button className='table-button' style={{ color: '#334eac', borderRadius: "10px", fontWeight: 'bold', padding: '2px' }}>
                    {row.Action}
                </Button>
            </Link>
        )}
    ];

    const rows = [
        { id: 1, DeliveryLocation: 'New York', DeliveryDate: '2024-05-12', Earnings: '$100.00', Status: 'Delivered', Action: 'View' },
        { id: 2, DeliveryLocation: 'Los Angeles', DeliveryDate: '2024-05-13', Earnings: '$120.50', Status: 'Delivered', Action: 'View' },
        { id: 3, DeliveryLocation: 'Chicago', DeliveryDate: '2024-05-14', Earnings: '$90.25', Status: 'Delivered', Action: 'View' },
        { id: 4, DeliveryLocation: 'Houston', DeliveryDate: '2024-05-15', Earnings: '$150.75', Status: 'Delivered', Action: 'View' },
        { id: 5, DeliveryLocation: 'Miami', DeliveryDate: '2024-05-16', Earnings: '$200.00', Status: 'Delivered', Action: 'View' }
    ];

    const handlechangepage = (event, newpage) => {
        setPage(newpage);
    }

    const handleRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <div className='comp-deliveries-table'>
            <Paper className='deliveries-table'>
                <TableContainer sx={{ maxHeight: '450' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: '#334eac', color: 'white' }} key={column.id}>{column.label}</TableCell>
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
                    rowsPerPageOptions={[5, 10, 25]}
                    page={page}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    component='div'
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default CompDeliveriesTable;
