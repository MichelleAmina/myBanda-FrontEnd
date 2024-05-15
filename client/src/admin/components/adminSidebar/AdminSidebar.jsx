import './adminSidebar.scss'

function AdminSidebar(){
    return(
        <div className='adminSidebar'>
            <div className="top">
                <span className='logo'>MyBanda</span>

            </div>

            <div className="center">
                <ul>
                    <li><span>Dashboard</span></li>
                    <li><span>Dashboard</span></li>
                    <li><span>Dashboard</span></li>
                    <li><span>Dashboard</span></li>
                </ul>
            </div>


            <div className="bottom">
                Color Options
            </div>
        </div>
    )
}

export default AdminSidebar