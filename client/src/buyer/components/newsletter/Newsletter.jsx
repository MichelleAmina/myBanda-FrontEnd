import './newsletter.css'
import Button from '@mui/material/Button';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


function Newsletter(){
    return(
        <div className="newsLetterBanner">
                <SendOutlinedIcon/>
                <input type="text" placeholder='Your email address' />
                <Button>Subscribe</Button>

            </div>


    )
}

export default Newsletter