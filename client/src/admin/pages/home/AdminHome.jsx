import './adminHome.scss'
import AdminWidget from '../../components/widget/AdminWidget'
import AdminFeatured from '../../components/featured/AdminFeatured'
import AdminChart from '../../components/charts/AdminChart'


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
                <AdminChart/>
            </div>
        </div>
            
       
    )
}

export default AdminHome