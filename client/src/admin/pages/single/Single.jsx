import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminChart from '../../components/charts/AdminChart';
import AdminTable from '../../components/table/AdminTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import './single.scss';

function Single() {
    const { sellerId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null);

    const columns = [
        { id: 'order_id', label: 'Order Id', minWidth: 170 },
        { id: 'product_id', label: 'Product Id', minWidth: 170 },
        { id: 'quantity', label: 'Quantity', minWidth: 170 },
        { id: 'product.price', label: 'Price', minWidth: 170 },
        { id: '', label: 'Total', minWidth: 170 },
        
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


    useEffect(() => {
        // Fetch user details using sellerId
        fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data); // Set the entire user object
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
                setLoading(false);
            });
    }, [sellerId]);


    useEffect(() => {
      fetch('https://mybanda-backend-88l2.onrender.com/order', {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
      })
      .then((response) => response.json())
      .then((data) => {
          // console.log("Fetched data:", data);

          const orderItemsArr = data.map(order => order.order_items);
          const orderItems = orderItemsArr.flatMap(orderItem => orderItem);

          // console.log("Flattened orderItems:", orderItems);

          // Convert sellerId to a string if necessary
          const sellerIdString = sellerId.toString();

          // Filter order items where the seller_id matches the sellerId
          const sellerOrderItems = orderItems.filter(item => {
              const itemSellerId = item.product?.shop?.seller_id?.toString();
              // console.log("Comparing item seller_id:", itemSellerId, "with sellerId:", sellerIdString);
              return itemSellerId === sellerIdString;
          });

          console.log("Filtered sellerOrderItems:", sellerOrderItems);
          setOrders(sellerOrderItems);
      })
      .catch((error) => {
          console.error('Error fetching orders:', error);
      });
  }, [sellerId]);

  console.log("the orders", orders)





    if(loading){
        return (
        <div className='adminLoader'>
            <img src="https://i.pinimg.com/originals/26/05/5a/26055ac39cd00944266e45a2799260e4.gif" alt="" className='w-100'/>
        </div>
        )
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    // Extract shop information from the user object
    const shop = user.shop || {};

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    

    return (
        <div className='adminSingle'>
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Shop Information</h1>
                        <div className="item">
                            <img src={shop.banner_image_url} alt="Shop Banner" className="itemImg" />
                            <div className="details">
                                <h2 className="itemTitle">{shop.name}</h2>
                                <div className="itemDescription">
                                    <p>{truncateText(shop.description, 70)}</p>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Email:</span>
                                    <span className='itemValue'>{user.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Phone:</span>
                                    <span className='itemValue'>{shop.contact}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Location:</span>
                                    <span className='itemValue'>{shop.location}</span>
                                </div>
                                <div className="detailItem">
                                    <span className='itemKey'>Total Products:</span>
                                    <span className='itemValue'>{shop.products.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <AdminChart aspect={3 / 1} title="Sales (Last 6 Months)" />
                    </div>
                </div>

                <div className="bottom">
                    <h1 className="title" style={{ fontSize: "20px" }}>Previous Orders</h1>
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
                                    {orders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{order.order_id}</TableCell>
                                                <TableCell>{order.product.id}</TableCell>
                                                <TableCell>{order.quantity}</TableCell>
                                                <TableCell>{order.product.price}</TableCell>
                                                <TableCell>{(order.quantity * order.product.price)}</TableCell>
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

                
            </div>
        </div>
            
    );
}

export default Single;


