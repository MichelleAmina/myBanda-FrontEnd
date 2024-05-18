import './adminHome.scss'
import AdminWidget from '../../components/widget/AdminWidget'
import AdminFeatured from '../../components/featured/AdminFeatured'
import AdminChart from '../../components/charts/AdminChart'
import AdminTable from '../../components/table/AdminTable'

function AdminHome(){
    return(
        
        <div className="adminHomeContainer">
            <div className="adminWidgets">
                <AdminWidget type="Seller" />
                <AdminWidget type="Customers"/>
                <AdminWidget type="Delivery Personnel"/>
                <AdminWidget type="Admin"/>
            </div>
            <div className="admin-charts">
                <AdminFeatured/>
                <AdminChart aspect={2 / 1} title="Total Users (Last 6 Months)"/>
            </div>
            <div className="listContainer">
                <div className="listTitle">
                    <h4>New Users</h4>
                    <AdminTable/>
                </div>
            </div>
        </div>
            
       
    )
}

export default AdminHome