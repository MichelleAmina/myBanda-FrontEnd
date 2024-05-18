//import PieChartBox from '../pieChartBox/PieChartBox'
//import BarChartBox from '../barChart/BarChart'
import './adminFeatured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {CircularProgressbar} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function AdminFeatured(){
    return(
        <div className='adminFeatured'>
            <div className="featured-top">
                <h1>Total Users</h1>
                <MoreVertIcon/>
            </div>

            <div className="featured-bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
                </div>
                <p className="featured-title">Total users as of today</p>
                <p className="featured-amount">5220</p>
                <p className="featured-desc">Previous Total Users Processing </p>

                <div className="featured-summary">
                    <div className="featured-item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon style={{fontSize:"25px"}}/>
                            <div className="resultAmount">5000</div>
                        </div>
                    </div>
                    <div className="featured-item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon style={{fontSize:"25px"}}/>
                            <div className="resultAmount">4950</div>
                        </div>
                    </div>
                    <div className="featured-item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon style={{fontSize:"25px"}}/>
                            <div className="resultAmount">3500</div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="adminFeatured1">
                <PieChartBox/>
            </div>
            <div className="adminFeatured2">
                <BarChartBox/>  
            </div>*/}
            
                  
            
        </div>
    )
}

export default AdminFeatured