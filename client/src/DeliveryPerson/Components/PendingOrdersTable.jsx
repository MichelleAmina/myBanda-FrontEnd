import "./pendingOrdersTable.css"
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import { useState } from 'react';

const AvailableOrders = () => {
    const columns = [
        { id: 'id', label: 'ID'},
        { id: 'DeliveryLocation', label: 'Delivery Location'},
        { id: 'SellerLocation', label: 'Seller Location'},
        // { id: 'Status', label: 'Status'},
        { id: 'Action', label: 'Action', renderCell: (row) => (
                <Button className='table-button' style={{ color: '#418107', borderRadius: "10px", fontWeight: 'bold', padding: '4px', alignContent: 'center'}}>
                    {row.Action}
                </Button>
            
        )}
    ];

    const rows = [
        { id: 1, DeliveryLocation: 'Dagoretti', DeliveryDate: '2024-05-12', SellerLocation: 'Mombasa',  Action: 'accept' },
        { id: 2, DeliveryLocation: 'Kilimani', DeliveryDate: '2024-05-13', SellerLocation: 'Kilimani',  Action: 'accept' },
        { id: 3, DeliveryLocation: 'Kiambu', DeliveryDate: '2024-05-14', SellerLocation: 'Syokimau',  Action: 'accept' },
        { id: 4, DeliveryLocation: 'Kawangware', DeliveryDate: '2024-05-15', SellerLocation: 'Kisumu',  Action: 'accept' },
        { id: 5, DeliveryLocation: 'Langata', DeliveryDate: '2024-05-16', SellerLocation: 'Machakos',  Action: 'accept' },
        { id: 3, DeliveryLocation: 'Juja', DeliveryDate: '2024-05-14', SellerLocation: 'Rongai',  Action: 'accept' },
        { id: 4, DeliveryLocation: 'South C', DeliveryDate: '2024-05-15', SellerLocation: 'Mombasa',  Action: 'accept' },
        { id: 5, DeliveryLocation: 'South B', DeliveryDate: '2024-05-16', SellerLocation: 'Mombasa',  Action: 'accept' },
        { id: 3, DeliveryLocation: 'Chicago', DeliveryDate: '2024-05-14', SellerLocation: 'Mombasa',  Action: 'accept' },
        { id: 4, DeliveryLocation: 'Houston', DeliveryDate: '2024-05-15', SellerLocation: 'Mombasa',  Action: 'accept' },
        { id: 5, DeliveryLocation: 'South B', DeliveryDate: '2024-05-16', SellerLocation: 'Mombasa',  Action: 'accept' },
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
                                    <TableCell style={{backgroundColor:'#FFD700', color:'#000'}} key={column.id}>{column.label}</TableCell>
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
 
export default AvailableOrders;