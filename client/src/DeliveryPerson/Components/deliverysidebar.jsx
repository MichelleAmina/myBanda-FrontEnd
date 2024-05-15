import { useState } from 'react';
import './deliverySidebar.css'
import { DeliverySidebarData } from './DeliverySidebarData';
import { Link } from 'react-router-dom';

const DeliverySidebar = () => {
    const [selected, setSelected] = useState(0)

    return ( 
        <div className='delivery-sidebar'>
            {/* {LOGO} */}
            <div className="logo">
                <Link to='/' style={{textDecoration: 'none'}}>
                    <h3>My Banda</h3>
                </Link>
            </div>
            <hr />
            <div className="delivery-menu">
                {DeliverySidebarData.map((item, index) => {
                    return (
                        <Link to={item.path} key={index} style={{textDecoration: 'none'}}>
                            <div className={selected === index ? "delivery-menu-item active" : "delivery-menu-item" }
                                onClick={() => setSelected(index)}
                            >
                                <item.icon />
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
     );
}
 
export default DeliverySidebar;
