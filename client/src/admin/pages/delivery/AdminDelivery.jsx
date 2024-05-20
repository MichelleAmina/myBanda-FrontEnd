import DataTable from '../../components/datatable/DataTable'
import './adminDelivery.scss'
import { useState, useEffect } from 'react';

function AdminDelivery(){
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/users")
            .then(resp => resp.json())
            .then((data) => {
                const filteredData = data.filter(user => user.role === 'delivery');
                setUserData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return(
        <div className="adminDelivery">
            <DataTable rows={userData} role="delivery"/>
        </div>
    )
}

export default AdminDelivery;


/*import DataTable from '../../components/datatable/DataTable'
import './adminDelivery.scss'


function AdminDelivery(){
    return(
        <div className="adminDelivery">
            <DataTable/>
        </div>
    )
}

export default AdminDelivery*/