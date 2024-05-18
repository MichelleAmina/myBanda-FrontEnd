import './adminTable.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AdminTable() {

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
    
  
    return (
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
    );
  }
  
  export default AdminTable;