import { colors } from '@mui/material'
import './pieChartBox.scss'

const data = [
    {name: "Seller", value: 100, color: "#0088FE"},
    {name: "Customer", value: 5000, color: "#00C49F"},
    {name: "Delivery", value: 100, color: "#FFBB28"},
    {name: "Banda Admin", value: 20, color: "#FF8042"},

];

function PieChartBox(){
    return(
        <div className="pieChartBox">
            <h2>Users</h2>
            <div className="pieChart">
                
            </div>
        </div>
    )
}

export default PieChartBox