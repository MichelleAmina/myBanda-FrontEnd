import { useState } from 'react';
import './deliverySidebar.css'
import { DeliverySidebarData } from './DeliverySidebarData';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const DeliverySidebar = () => {
    const [selected, setSelected] = useState(null)

    return ( 
        <div className='delivery-sidebar'>
            {/* {LOGO} */}
            <div className="logo">
                <Link to='/driverAnalytics' style={{textDecoration: 'none'}}>
                    
                    <span><HomeIcon/>My Banda</span>
                </Link>
            </div>
            <div className="delivery-menu">
                {DeliverySidebarData.map((item, index) => {
                    return (                      
                        <div key={index} onClick={() => setSelected(index)}>
                            <Link 
                                to={item.path} 
                                style={{textDecoration: 'none'}} 
                                className={`delivery-menu-item ${selected === index ? 'delivery-active' : ''}`}
                            >
                                <item.icon />
                                <span>{item.title}</span>
                            </Link> 
                        </div>                
                    )
                })}
            </div>
        </div>
     );
}
 
export default DeliverySidebar;
