import DataTable from '../../components/datatable/DataTable'
import './list.scss'

function List(){
    return(
        <div className='adminList'>
            <div className="listContainer">
                <DataTable/>
            </div>
        </div>
    )
}

export default List