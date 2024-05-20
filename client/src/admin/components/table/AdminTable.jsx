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
                      {column.id === 'location' && user.role === 'seller' 
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
        rowsPerPageOptions={[5, 10, 25]}
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



/*
import './adminTable.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { useState } from 'react';



function AdminTable({users}) {

  console.log("from admin table", users)

    const columns = [
      { id: 'id', label: 'Id', minWidth: 170 },
      { id: 'role', label: 'Role', minWidth: 170 },
      { id: 'location', label: 'Location', minWidth: 170 },
      { id: 'email', label: 'Email', minWidth: 170 },
      
    ]

    const rows = [
        {
            id:"1234",
            role:"Seller",
            location:"Kinoo",
            email:"shop1@gmail.com",
        },
        {
            id:"123456",
            role:"Delivery personell",
            location:"Kajiado",
            email:"delivery1@gmail.com",
        },
        {
            id:"123478",
            role:"Customer",
            location:"Kilimani",
            email:"customer1@gmail.com",
        },
        {
            id:"1234312",
            role:"Seller",
            location:"Lavington",
            email:"shop2@gmail.com",
        },
        {
            id:"1231236",
            role:"Delivery personel",
            location:"Kijabe",
            email:"delivery2@gmail.com",
        },
        {
            id:"1245634",
            role:"Customer",
            location:"Parklands",
            email:"customer2@gmail.com",
        }
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
      <Paper className='adminTable'>
          <TableContainer sx={{maxHeight: '450'}}>
              <Table stickyHeader>
                  <TableHead>
                      <TableRow>
                          {columns.map((column)=> (
                              <TableCell key={column.id} className='tableCell'>{column.label}</TableCell>
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
      
    );
  }
  
  export default AdminTable;*/


  /*
        <TableContainer component={Paper} className='adminTable'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell className='tableCell'>User ID</TableCell>
              <TableCell className='tableCell'>Role</TableCell>
              <TableCell className='tableCell'>Location</TableCell>
              <TableCell className='tableCell'>Email</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >{row.id}
                </TableCell>
                <TableCell className='tableCell2' align="left">{row.role}</TableCell>
                <TableCell className='tableCell2' align="left">{row.location}</TableCell>
                <TableCell className='tableCell2' align="left">{row.email}</TableCell>
    
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      */