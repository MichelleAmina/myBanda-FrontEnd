import DataTable from '../../components/datatable/DataTable'
import './adminCustomer.scss'
import { useState, useEffect } from 'react';

function AdminCustomer(){
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/users")
            .then(resp => resp.json())
            .then((data) => {
                const filteredData = data.filter(user => user.role === 'buyer');
                setUserData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return(
        <div className="adminCustomer">
            <DataTable rows={userData} role="buyer"/>
        </div>
    )
}

export default AdminCustomer;

/*
import DataTable from '../../components/datatable/DataTable'
import './adminCustomer.scss'


function AdminCustomer(){
    return(
        <div className="adminCustomer">
            <DataTable/>

        </div>
    )
}

export default AdminCustomer*/