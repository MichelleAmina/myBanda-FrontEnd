import './adminTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';

function AdminTable({ users }) {
  console.log("from admin table", users);

  const columns = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'role', label: 'Role', minWidth: 170 },
    { id: 'location', label: 'Location', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Paper className='adminTable'>
      <TableContainer sx={{ maxHeight: '450' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} className='tableCell'>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'id' 
                        // ? `${user.id} + ${Math.floor(Math.random() * 10000)}` 
                        ? user.id + Math.floor(Math.random() * 10000) 
                        : column.id === 'location' && user.role === 'seller' 
                          ? user.shop?.location 
                          : user[column.id]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        page={page}
        count={users.length}
        rowsPerPage={rowsPerPage}
        component='div'
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
}

export default AdminTable;
