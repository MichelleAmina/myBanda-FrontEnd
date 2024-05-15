import './featured.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
    return ( 
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                            <MoreVertIcon fontSize="small"/>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
                </div>
                <p className="title">Income made today</p>
                <p className="amount">Ksh.420</p>
                <p className="desc">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        {/* <div className="itemTitle"></div> */}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Featured;