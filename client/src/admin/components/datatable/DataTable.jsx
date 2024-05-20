import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { shopColumns } from '../../dataTableSource';
import { NavLink } from 'react-router-dom';

function DataTable({ rows, role }) {
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                const sellerId = params.row.id; 
                return (
                    <div className="cellAction">
                        {role === 'seller' && params.row.shop && (
                            <NavLink to={`/banda_admin/shops/${sellerId}`} style={{ textDecoration: "none" }}>
                                <div className="viewButton">View</div>
                            </NavLink>
                        )}
                        <div className="deleteButton">Delete</div>
                    </div>
                );
            }
        },
    ];

    return (
        <div className="dataTable">
            <div className="dataTableTitle">
                <h1>View All {role === 'seller' ? 'Shops' : role === 'buyer' ? 'Customers' : 'Delivery Personnel'}...</h1>
            </div>
            <DataGrid
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                }}
                rows={rows}
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







/*
THIS WORKS OKAY

import './dataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { shopColumns } from '../../dataTableSource';
import { NavLink } from 'react-router-dom';

function DataTable({ rows, role }) {

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {role === 'seller' && (
                            <>
                                <NavLink to='/banda_admin/shops/test' style={{ textDecoration: "none" }}>
                                    <div className="viewButton">View</div>
                                </NavLink>
                                <div className="deleteButton">Delete</div>
                            </>
                        )}
                    </div>
                );
            }
        },
    ];

    return (
        <div className="dataTable">
            <div className="dataTableTitle">
                <h1>View All {role === 'seller' ? 'Shops' : role === 'buyer' ? 'Customers' : 'Delivery Personnel'}...</h1>
            </div>
            <DataGrid
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                }}
                rows={rows}
                columns={shopColumns.concat(role === 'seller' ? actionColumn : [])}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default DataTable;

/*
import './dataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { shopColumns, shopRows } from '../../dataTableSource';
import {NavLink} from 'react-router-dom'
    /*
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    }
 

  

function DataTable(){

    const actionColumn = [
        {
            field:"action", 
            headerName:"Action", 
            width: 150,  
            renderCell:(params) => {
                return(
                    <div className="cellAction">
                        <NavLink to='/banda_admin/shops/test' style={{textDecoration:"none"}}>
                            <div className="viewButton">View</div>
                            
                        </NavLink>
                        <div className="deleteButton">Delete</div>
                        
                        
                    </div>
                );
            }
        },
    ]

   


    return(
        <div className="dataTable">
            <div className="dataTableTitle">
                <h1>View All Shops...</h1>
            </div>
            <DataGrid
            sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                   outline: "none !important",
                },
             }}
            
            rows={shopRows}
            columns={shopColumns.concat(actionColumn)}
            initialState={{
            pagination: {
            paginationModel: { page: 0, pageSize: 9 },
            
          },
        }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
        </div>
    )
}


export default DataTable*/