import DataTable from '../../components/datatable/DataTable'
import './list.scss'
import { useState, useEffect } from 'react';

function List(){
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://mybanda-backend-88l2.onrender.com/users")
            .then(resp => resp.json())
            .then((data) => {
                const filteredData = data.filter(user => user.role === 'seller');
                setUserData(filteredData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    console.log("userData", userData)

    if(loading){
        return (
        <div className='adminLoader'>
            <img src="https://i.pinimg.com/originals/26/05/5a/26055ac39cd00944266e45a2799260e4.gif" alt="" className='w-100'/>
        </div>
        )
    }

    if (error) {
        return <div>Error loading vendor data</div>;
    }

    return(
        <div className='adminList'>
            <div className="listContainer">
                <DataTable rows={userData} role="seller"/>
            </div>
        </div>
    )
}

export default List;

