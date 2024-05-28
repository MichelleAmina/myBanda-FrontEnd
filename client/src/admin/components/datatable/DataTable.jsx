
// CODE WORKS I THINK
// ERROR 403; ADMIN PRIVILEDGES REQUIRED 

import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { shopColumns } from '../../dataTableSource';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

function DataTable({ rows, role }) {
    const [tableRows, setTableRows] = useState(rows);
    

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://mybanda-backend-88l2.onrender.com/del_user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (response.ok) {
                setTableRows(tableRows.filter((row) => row.id !== id));
                toast.success("User deleted successfully ", {position: "top-center"})
            } else {
                const errorData = await response.json();
                toast.error("Failed to delete", {position: "top-center"})
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                const sellerId = params.row.id;
                console.log("this is the seller id", sellerId)
                return (
                    <div className="cellAction">
                        {role === 'seller' && params.row.shop && (
                            <NavLink to={`/banda_admin/shops/${sellerId}`} style={{ textDecoration: 'none' }}>
                                <div className="viewButton">View</div>
                            </NavLink>
                        )}
                        
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="dataTable">
            <div className="dataTableTitle">
                <h1>
                    View All {role === 'seller' ? 'Shops' : role === 'buyer' ? 'Customers' : 'Delivery Personnel'}...
                </h1>
            </div>
            <DataGrid
                sx={{
                    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important',
                    },
                }}
                rows={tableRows}
                columns={shopColumns.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable;









