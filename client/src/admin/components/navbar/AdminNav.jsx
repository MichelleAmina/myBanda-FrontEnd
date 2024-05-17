import './adminNav.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ListIcon from '@mui/icons-material/List';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function AdminNav(){
    return(
        <div className='adminNavbar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Search...' />
                    <SearchOutlinedIcon/>
                </div>

                <div className="navItems">
                    <div className="navItem">
                        <LanguageIcon className='icon'/>
                        English
                    </div>
                    <div className="navItem">
                        <DarkModeIcon className='icon'/>
                        
                    </div>
                    
                    <div className="navItem">
                        <NotificationsIcon className='icon'/>
                        <div className="counter">1</div>
                        
                    </div>
                    
                    <div className="navItem">
                        <ListIcon className='icon'/>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNav