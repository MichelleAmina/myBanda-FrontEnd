import "./pendingOrdersTable.css"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../data";

const AvailableOrders = () => {
    const actionColumn = [{field: "action", headerName: "Action", width: 200, renderCell:()=>{
        return(
            <div className="cellAction">
                {/* <div className="viewButton">View</div> */}
                <div className="acceptButton">accept</div>
            </div>
        )
    }}]

    return ( 
        <div className="available-deliveries">
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
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
 
export default AvailableOrders;