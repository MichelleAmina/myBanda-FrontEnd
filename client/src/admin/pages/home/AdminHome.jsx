import './adminHome.scss'
import AdminWidget from '../../components/widget/AdminWidget'
import AdminFeatured from '../../components/featured/AdminFeatured'
import AdminChart from '../../components/charts/AdminChart'
import AdminTable from '../../components/table/AdminTable'
import { useState, useEffect } from 'react';

function AdminHome() {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/users")
          .then(resp => resp.json())
          .then((data) => {
            setUserData(data)
          })
          .catch(error => {
            console.error('Error fetching products data:', error);
          });
    }, []);

    //console.log("all user data", userData)

    const countUserRoles = (data) => {
        const counts = {
            seller: 0,
            customer: 0,
            delivery: 0,
            admin: 0
        };

        data.forEach(user => {
            if (user.role === 'seller') counts.seller++;
            if (user.role === 'buyer') counts.customer++;
            if (user.role === 'delivery') counts.delivery++;
            if (user.role === 'admin') counts.admin++;
        });

        return counts;
    }

    const userRoleCounts = countUserRoles(userData);

    return (
        <div className="adminHomeContainer">
            <div className="adminWidgets">
                {Object.entries(userRoleCounts).map(([role, count]) => (
                    <AdminWidget key={role} role={role} count={count} />
                ))}
            </div>
            <div className="admin-charts">
                <AdminFeatured />
                <AdminChart aspect={2 / 1} title="Total Users (Last 6 Months)" />
            </div>
            <div className="listContainer">
                <div className="listTitle">
                    <h4>New Users</h4>
                    <AdminTable users={userData}/>
                </div>
            </div>
        </div>
    )
}

export default AdminHome


